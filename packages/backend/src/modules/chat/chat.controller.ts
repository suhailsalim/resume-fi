import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send message to AI assistant' })
  async sendMessage(
    @Req() req,
    @Body() body: { jobId: string; content: string },
  ) {
    const message = await this.chatService.sendMessage(
      req.user.id,
      body.jobId,
      body.content,
    );
    return { message };
  }

  @Get('history/:jobId')
  @ApiOperation({ summary: 'Get chat history for job' })
  async getChatHistory(@Req() req, @Param('jobId') jobId: string) {
    const history = await this.chatService.getChatHistory(req.user.id, jobId);
    return { history };
  }
}
