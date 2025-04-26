import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from '../ai/ai.module';
import { JobsModule } from '../jobs/jobs.module';
import { FirebaseConfig } from '../../config/firebase.config';

@Module({
  imports: [AiModule, JobsModule],
  controllers: [ChatController],
  providers: [ChatService, FirebaseConfig],
})
export class ChatModule {}
