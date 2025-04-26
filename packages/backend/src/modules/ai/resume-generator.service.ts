import { Injectable } from '@nestjs/common';
import { Profile } from '@resume-fi/shared';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts';
import { AiService } from './ai.service';

@Injectable()
export class ResumeGeneratorService {
  constructor(private aiService: AiService) { }

  async generateTailoredResume(jobDescription: string, profile: Profile): Promise<string> {
    const systemTemplate = `You are a professional resume writer. Create a tailored resume for the candidate based on the job description and their profile.`;

    const humanTemplate = `
        Job Description:
        {jobDescription}

        Candidate Profile:
        {profile}
        
        Generate a polished, professional resume with these sections: Contact Information, Professional Summary (tailored to this job), Skills (prioritized based on job relevance), Experience (highlighting relevant achievements), Projects (highlighting relevant technologies and outcomes), Education, Certifications (if relevant)
        The resume should emphasize the candidate's strengths that align with the job requirements.
        Format it with clean formatting and bullet points using Markdown.
        `;
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(systemTemplate),
      HumanMessagePromptTemplate.fromTemplate(humanTemplate),
    ]);
    return this.aiService.generateContent(chatPrompt, { profile: JSON.stringify(profile, null, 2), jobDescription });
  }
}
