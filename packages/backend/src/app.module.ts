import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ChatModule } from './modules/chat/chat.module';
import { AiModule } from './modules/ai/ai.module';
import { LangchainModule } from './modules/langchain/langchain.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    
    // Feature modules
    AuthModule,
    UsersModule,
    JobsModule,
    ChatModule,
    AiModule,
    LangchainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}