import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { Profile } from '@resume-fi/shared';

@Injectable()
export class ResumeParserService {
  constructor(private aiService: AiService) {}

  async parseResume(resumeText: string): Promise<Partial<Profile>> {
    const prompt = `
      You are a professional resume parser. Extract the following information from the resume text in a structured format:
      
      1. Personal Information (name, contact details, location, etc.)
      2. Professional Summary
      3. Skills (with a rating from 1-5 based on emphasis in the resume)
      4. Work Experience (company, title, dates, responsibilities)
      5. Projects (name, description, technologies used)
      6. Education (institutions, degrees, dates)
      7. Certifications
      8. Awards and Achievements
      
      Format the output as a valid JSON object that matches this TypeScript type:
      
      interface Profile {
        personalInfo: {
          fullName: string;
          phone?: string;
          email: string;
          location?: string;
          socials: {
            linkedin?: string;
            github?: string;
            portfolio?: string;
            twitter?: string;
          };
          summary?: string;
        };
        skills: Array<{
          name: string;
          rating: number; // 1-5
          category?: string;
        }>;
        experience: Array<{
          title: string;
          company: string;
          location?: string;
          startDate: string; // ISO format date
          endDate?: string; // ISO format date
          current: boolean;
          description: string;
        }>;
        projects: Array<{
          name: string;
          description: string;
          technologies: string[];
          url?: string;
          startDate?: string; // ISO format date
          endDate?: string; // ISO format date
        }>;
        education: Array<{
          institution: string;
          degree: string;
          field: string;
          startDate: string; // ISO format date
          endDate?: string; // ISO format date
          gpa?: number;
        }>;
        certifications: Array<{
          name: string;
          issuer: string;
          date: string; // ISO format date
          url?: string;
        }>;
        awards: Array<{
          title: string;
          issuer: string;
          date: string; // ISO format date
          description?: string;
        }>;
      }
      
      Resume text to parse:\n${resumeText}
    `;

    const aiResponse = await this.aiService.generateText(prompt);
    
    try {
      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }
      
      const parsedProfile = JSON.parse(jsonMatch[0]);
      return this.convertDatesToObjects(parsedProfile);
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw new Error('Failed to parse resume');
    }
  }

  private convertDatesToObjects(profile: any): Partial<Profile> {
    // Convert ISO date strings to Date objects
    if (profile.experience) {
      profile.experience = profile.experience.map(exp => ({
        ...exp,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : undefined,
      }));
    }

    if (profile.projects) {
      profile.projects = profile.projects.map(proj => ({
        ...proj,
        startDate: proj.startDate ? new Date(proj.startDate) : undefined,
        endDate: proj.endDate ? new Date(proj.endDate) : undefined,
      }));
    }

    if (profile.education) {
      profile.education = profile.education.map(edu => ({
        ...edu,
        startDate: new Date(edu.startDate),
        endDate: edu.endDate ? new Date(edu.endDate) : undefined,
      }));
    }

    if (profile.certifications) {
      profile.certifications = profile.certifications.map(cert => ({
        ...cert,
        date: new Date(cert.date),
      }));
    }

    if (profile.awards) {
      profile.awards = profile.awards.map(award => ({
        ...award,
        date: new Date(award.date),
      }));
    }

    return profile;
  }
}
