import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { UsersModule } from '../users/users.module';
import { AiModule } from '../ai/ai.module';
import { FirebaseConfig } from '../../config/firebase.config';

@Module({
  imports: [UsersModule, AiModule],
  controllers: [JobsController],
  providers: [JobsService, FirebaseConfig],
  exports: [JobsService],
})
export class JobsModule {}
