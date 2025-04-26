import { Injectable, Inject } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { ChatPromptTemplate, ChatMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod';

import { LangchainService } from '../langchain/langchain.service';
  @Injectable()
  export class AiService {
    constructor(@Inject(LangchainService) private readonly langchainService: LangchainService) {}
  
    /**
     * Generate structured output based on a given prompt and schema.
     * @param prompt The user's prompt.
     * @param schema The schema for the structured output.
     * @returns A Promise that resolves to the structured output.
     */
    async generateStructuredOutput<T extends z.ZodTypeAny>(chatPromptTemplate: ChatPromptTemplate, schema: T): Promise<z.infer<T>> {
      const parser = StructuredOutputParser.fromZodSchema(schema);
      const chatModel = this.langchainService.getChatModel();
      const formatInstructions = parser.getFormatInstructions();
  
      const chatPrompt = chatPromptTemplate;
      const prompt = await chatPrompt.getPrompt().format({});

      const messages = await chatPrompt.formatPromptValue({
        format_instructions: formatInstructions,
        prompt: prompt,
      }).toChatMessages();
  
      const result = await chatModel.invoke(messages);
      const parsedResult = await parser.parse(result.content);
      return parsedResult;
    }
  
    /**
     * Generate content based on a prompt and optional context.
     * @param prompt The user's prompt.
     * @param context Optional context for the model.
     * @returns A Promise that resolves to the model's content.
     */
    async generateContent(chatPromptTemplate: ChatPromptTemplate, context?: string): Promise<string> {
      const chatModel = this.langchainService.getChatModel();
      const result = await chatPromptTemplate.formatPromptValue({context}).toChatMessages();
      const resultModel = await chatModel.invoke(result);
      return result.content;
    }
  }

