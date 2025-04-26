import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { ResumeParserService } from './resume-parser.service';
import { JobAnalyzerService } from './job-analyzer.service';
import { ResumeGeneratorService } from './resume-generator.service';
import { CoverLetterGeneratorService } from './cover-letter-generator.service';

@Module({
  imports: [ConfigModule],
  providers: [
    AiService,
    ResumeParserService,
    JobAnalyzerService,
    ResumeGeneratorService,
    CoverLetterGeneratorService,
  ],
  exports: [
    AiService,
    ResumeParserService,
    JobAnalyzerService,
    ResumeGeneratorService,
    CoverLetterGeneratorService,
  ],
})
export class AiModule {}
