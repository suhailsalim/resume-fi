import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessage } from '@resume-fi/shared';
import { FirebaseConfig } from '../../config/firebase.config';
import { AiService } from '../ai/ai.service';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class ChatService {
  constructor(
    private firebaseConfig: FirebaseConfig,
    private aiService: AiService,
    private jobsService: JobsService,
  ) {}

  async sendMessage(userId: string, jobId: string, content: string): Promise<ChatMessage> {
    // Validate that the job exists and belongs to the user
    await this.jobsService.getJobAnalysis(userId, jobId);

    // Create user message
    const userMessageRef = this.firebaseConfig.firestore.collection('chatMessages').doc();
    const userMessage: ChatMessage = {
      id: userMessageRef.id,
      userId,
      jobId,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    await userMessageRef.set(userMessage);

    // Get chat history for context
    const chatHistory = await this.getChatHistory(userId, jobId);
    const historyText = chatHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Get job information
    const job = await this.jobsService.getJobAnalysis(userId, jobId);

    // Generate AI response
    const prompt = `
      You are a job application assistant helping a candidate with their job application.
      
      Job Title: ${job.title}
      Company: ${job.company}
      Job Description: ${job.description.substring(0, 500)}...
      
      Analysis Overview:
      - Match Score: ${job.analysis.matchScore}%
      - Key Strengths: ${job.analysis.strengths.join(', ')}
      - Areas to Improve: ${job.analysis.weaknesses.join(', ')}
      
      Previous conversation:
      ${historyText}
      
      User: ${content}
      
      Provide helpful, concise advice related to this specific job application.
      Focus on practical suggestions to improve the candidate's application materials or interview preparation.
      If the user asks questions outside the scope of job applications, politely redirect them to job-related questions.
    `;

    const aiContent = await this.aiService.generateText(prompt);

    // Create assistant message
    const assistantMessageRef = this.firebaseConfig.firestore.collection('chatMessages').doc();
    const assistantMessage: ChatMessage = {
      id: assistantMessageRef.id,
      userId,
      jobId,
      role: 'assistant',
      content: aiContent,
      timestamp: new Date(),
    };

    await assistantMessageRef.set(assistantMessage);

    return assistantMessage;
  }

  async getChatHistory(userId: string, jobId: string): Promise<ChatMessage[]> {
    const chatSnapshot = await this.firebaseConfig.firestore
      .collection('chatMessages')
      .where('userId', '==', userId)
      .where('jobId', '==', jobId)
      .orderBy('timestamp', 'asc')
      .get();

    return chatSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ChatMessage);
  }
}
