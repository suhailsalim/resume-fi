import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatPromptTemplate, HumanMessagePromptTemplate } from 'langchain/prompts';

import { Profile } from '@resume-fi/shared';

@Injectable()
export class CoverLetterGeneratorService {
  constructor(private aiService: AiService) {}

  async generateCoverLetter(jobDescription: string, profile: Profile): Promise<string> {
    const promptTemplate = ChatPromptTemplate.fromPromptMessages([
      HumanMessagePromptTemplate.fromTemplate(`
        You are a professional cover letter writer. Create a personalized cover letter for the candidate based on the job description and their profile.
        
        Job Description:
        {jobDescription}
        
        Candidate Profile:
        {profile}
        
        Generate a compelling, professional cover letter that:
        
        1. Addresses the specific company and position
        2. Captures the candidate's enthusiasm for the role
        3. Highlights 3-4 key qualifications and experiences most relevant to this job
        4. Demonstrates understanding of the company's needs
        5. Includes a call to action for next steps
        
        The cover letter should be personable yet professional, about 300-400 words,
        and formatted in professional business letter style using Markdown.
      `),
    ]);

    return this.aiService.generateContent(promptTemplate, { jobDescription, profile: JSON.stringify(profile) });
  }
}
