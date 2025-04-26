import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Submit job for analysis' })
  async analyzeJob(@Req() req, @Body() jobData: any) {
    const job = await this.jobsService.analyzeJob(req.user.id, jobData);
    return { job };
  }

  @Get()
  @ApiOperation({ summary: 'Get all user jobs' })
  async getUserJobs(@Req() req) {
    const jobs = await this.jobsService.getUserJobs(req.user.id);
    return { jobs };
  }

  @Get('analysis/:id')
  @ApiOperation({ summary: 'Get job analysis results' })
  async getJobAnalysis(@Req() req, @Param('id') jobId: string) {
    const job = await this.jobsService.getJobAnalysis(req.user.id, jobId);
    return { job };
  }

  @Post('tailored-resume')
  @ApiOperation({ summary: 'Generate tailored resume' })
  async generateTailoredResume(@Req() req, @Body() body: { jobId: string }) {
    const resume = await this.jobsService.generateTailoredResume(req.user.id, body.jobId);
    return { resume };
  }

  @Post('cover-letter')
  @ApiOperation({ summary: 'Generate cover letter' })
  async generateCoverLetter(@Req() req, @Body() body: { jobId: string }) {
    const coverLetter = await this.jobsService.generateCoverLetter(req.user.id, body.jobId);
    return { coverLetter };
  }
}
