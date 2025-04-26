import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts';
import { AiService } from './ai.service';
import { Profile, JobAnalysis } from '@resume-fi/shared';

@Injectable()
export class JobAnalyzerService {
  constructor(private aiService: AiService) { }

  async analyzeJobMatch(jobDescription: string, profile: Profile): Promise<JobAnalysis> {
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `
        You are a professional job compatibility analyzer. Analyze the match between the candidate's profile and the job description.
      You are a professional job compatibility analyzer. Analyze the match between the candidate's profile and the job description.
      
      Job Description:\n${jobDescription}\n\n
      Candidate Profile:\n${JSON.stringify(profile, null, 2)}\n\n
      Provide a detailed analysis with the following:
      
      1. Match Score: A percentage (0-100) indicating overall compatibility
      2. Strengths: List key strengths that align with the job requirements
      3. Weaknesses: List areas where the candidate may fall short
      4. Gaps: Identify specific skills or experiences missing
      5. Upskilling Suggestions: Recommend specific learning paths to close gaps
      
      Format the output as a valid JSON object that matches this TypeScript type:
      
      interface JobAnalysis {
        matchScore: number; // 0-100
        strengths: string[];
        weaknesses: string[];
        gaps: string[];
        upskillingSuggestions: string[];
      }
    `),
      HumanMessagePromptTemplate.fromTemplate(
        `
        Job Description:\n{jobDescription}\n\n
        Candidate Profile:\n{profile}\n\n
        Provide a detailed analysis with the following:
      
      1. Match Score: A percentage (0-100) indicating overall compatibility
      2. Strengths: List key strengths that align with the job requirements
      3. Weaknesses: List areas where the candidate may fall short
      4. Gaps: Identify specific skills or experiences missing
      5. Upskilling Suggestions: Recommend specific learning paths to close gaps`
      ),
    ]);

    const response = await this.aiService.generateContent(chatPrompt, { profile: JSON.stringify(profile, null, 2), jobDescription });
    try {
      return JSON.parse(response) as JobAnalysis;
    } catch (error) {
      console.error('Error during analyze the job response', error);
      throw new Error('Failed to generate AI response');
    }
  }
}
