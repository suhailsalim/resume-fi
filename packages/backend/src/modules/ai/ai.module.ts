import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LangchainService } from '../langchain/langchain.service';
import { LangchainModule } from '../langchain/langchain.module';
import { AiService } from './ai.service';
import { ResumeParserService } from './resume-parser.service';
import { JobAnalyzerService } from './job-analyzer.service';
import { ResumeGeneratorService } from './resume-generator.service';
import { CoverLetterGeneratorService } from './cover-letter-generator.service';

@Module({
  imports: [ConfigModule, LangchainModule],
  providers: [{
      provide: LangchainService,
      useFactory: (configService: ConfigService) => {
        return LangchainService.create({
          apiKey: configService.get<string>('GOOGLE_AI_API_KEY'),
        });
      },
      inject: [ConfigService]
    },

    
    AiService,
    ResumeParserService,
    JobAnalyzerService,
    ResumeGeneratorService,
    CoverLetterGeneratorService
  ],
  exports: [
    AiService,
    ResumeParserService,
    JobAnalyzerService,
    ResumeGeneratorService,
    CoverLetterGeneratorService,
    LangchainService
  ],
})
export class AiModule {}
