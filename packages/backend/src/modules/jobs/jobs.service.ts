import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobAnalysis, Profile } from '@resume-fi/shared';
import { FirebaseConfig } from '../../config/firebase.config';
import { UsersService } from '../users/users.service';
import { JobAnalyzerService } from '../ai/job-analyzer.service';
import { ResumeGeneratorService } from '../ai/resume-generator.service';
import { CoverLetterGeneratorService } from '../ai/cover-letter-generator.service';

@Injectable()
export class JobsService {
  constructor(
    private firebaseConfig: FirebaseConfig,
    private usersService: UsersService,
    private jobAnalyzerService: JobAnalyzerService,
    private resumeGeneratorService: ResumeGeneratorService,
    private coverLetterGeneratorService: CoverLetterGeneratorService,
  ) {}

  async analyzeJob(userId: string, jobData: Partial<Job>): Promise<Job> {
    // Get user profile
    const profile = await this.usersService.getProfile(userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    // Analyze job match
    const analysis = await this.jobAnalyzerService.analyzeJobMatch(jobData.description, profile);

    // Create job entry
    const jobRef = this.firebaseConfig.firestore.collection('jobs').doc();
    const job: Job = {
      id: jobRef.id,
      userId,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      url: jobData.url,
      description: jobData.description,
      analysis,
      createdAt: new Date(),
    };

    await jobRef.set(job);
    return job;
  }

  async getJobAnalysis(userId: string, jobId: string): Promise<Job> {
    const jobDoc = await this.firebaseConfig.firestore
      .collection('jobs')
      .doc(jobId)
      .get();

    if (!jobDoc.exists || jobDoc.data().userId !== userId) {
      throw new NotFoundException('Job not found');
    }

    return { id: jobDoc.id, ...jobDoc.data() } as Job;
  }

  async getUserJobs(userId: string): Promise<Job[]> {
    const jobsSnapshot = await this.firebaseConfig.firestore
      .collection('jobs')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Job);
  }

  async generateTailoredResume(userId: string, jobId: string): Promise<string> {
    // Get job details
    const job = await this.getJobAnalysis(userId, jobId);
    
    // Get user profile
    const profile = await this.usersService.getProfile(userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    // Generate tailored resume
    const resume = await this.resumeGeneratorService.generateTailoredResume(
      job.description,
      profile,
    );

    // Save the generated resume to the job applications collection
    const applicationRef = this.firebaseConfig.firestore.collection('jobApplications').doc();
    await applicationRef.set({
      id: applicationRef.id,
      userId,
      jobId,
      tailoredResume: resume,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return resume;
  }

  async generateCoverLetter(userId: string, jobId: string): Promise<string> {
    // Get job details
    const job = await this.getJobAnalysis(userId, jobId);
    
    // Get user profile
    const profile = await this.usersService.getProfile(userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    // Generate cover letter
    const coverLetter = await this.coverLetterGeneratorService.generateCoverLetter(
      job.description,
      profile,
    );

    // Update the job application
    const applicationSnapshot = await this.firebaseConfig.firestore
      .collection('jobApplications')
      .where('userId', '==', userId)
      .where('jobId', '==', jobId)
      .limit(1)
      .get();

    if (applicationSnapshot.empty) {
      // Create new application
      const applicationRef = this.firebaseConfig.firestore.collection('jobApplications').doc();
      await applicationRef.set({
        id: applicationRef.id,
        userId,
        jobId,
        coverLetter,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      // Update existing application
      const applicationRef = applicationSnapshot.docs[0].ref;
      await applicationRef.update({
        coverLetter,
        updatedAt: new Date(),
      });
    }

    return coverLetter;
  }
}
