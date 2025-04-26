import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { Profile } from '@resume-fi/shared';

@Injectable()
export class ResumeGeneratorService {
  constructor(private aiService: AiService) {}

  async generateTailoredResume(jobDescription: string, profile: Profile): Promise<string> {
    const prompt = `
      You are a professional resume writer. Create a tailored resume for the candidate based on the job description and their profile.
      
      Job Description:\n${jobDescription}\n\n
      Candidate Profile:\n${JSON.stringify(profile, null, 2)}\n\n
      Generate a polished, professional resume with these sections:
      
      1. Contact Information
      2. Professional Summary (tailored to this job)
      3. Skills (prioritized based on job relevance)
      4. Experience (highlighting relevant achievements)
      5. Projects (highlighting relevant technologies and outcomes)
      6. Education
      7. Certifications (if relevant)
      
      The resume should emphasize the candidate's strengths that align with the job requirements.
      Format it with clean formatting and bullet points using Markdown.
    `;

    return this.aiService.generateText(prompt);
  }
}
