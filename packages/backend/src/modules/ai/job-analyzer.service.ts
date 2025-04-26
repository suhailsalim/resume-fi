import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { Profile, JobAnalysis } from '@resume-fi/shared';

@Injectable()
export class JobAnalyzerService {
  constructor(private aiService: AiService) {}

  async analyzeJobMatch(jobDescription: string, profile: Profile): Promise<JobAnalysis> {
    const prompt = `
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
    `;

    const aiResponse = await this.aiService.generateText(prompt);
    
    try {
      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }
      
      return JSON.parse(jsonMatch[0]) as JobAnalysis;
    } catch (error) {
      console.error('Error analyzing job match:', error);
      throw new Error('Failed to analyze job match');
    }
  }
}
