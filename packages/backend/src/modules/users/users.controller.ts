import { Controller, Get, Put, Post, Body, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req) {
    const profile = await this.usersService.getProfile(req.user.id);
    return { profile };
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@Req() req, @Body() profileData: any) {
    const updatedProfile = await this.usersService.updateProfile(req.user.id, profileData);
    return { profile: updatedProfile };
  }

  @Post('resume')
  @ApiOperation({ summary: 'Upload and process resume' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(@Req() req, @UploadedFile() file) {
    // In a real implementation, this would parse the resume file
    // For now, we'll simulate with mock data
    const mockResumeData = {
      personalInfo: {
        fullName: 'Sample User',
        email: req.user.email,
        phone: '123-456-7890',
        location: 'San Francisco, CA',
        socials: {
          linkedin: 'https://linkedin.com/in/sampleuser',
          github: 'https://github.com/sampleuser',
        },
        summary: 'Experienced software engineer with a passion for building innovative products.',
      },
      skills: [
        { name: 'JavaScript', rating: 5, category: 'Programming' },
        { name: 'TypeScript', rating: 4, category: 'Programming' },
        { name: 'React', rating: 5, category: 'Frontend' },
      ],
      // Other fields would be populated from resume parsing
    };
    
    const processedProfile = await this.usersService.processResume(req.user.id, mockResumeData);
    return { profile: processedProfile };
  }

  @Get('resume')
  @ApiOperation({ summary: 'Get processed resume data' })
  async getResume(@Req() req) {
    const profile = await this.usersService.getProfile(req.user.id);
    return { resume: profile };
  }
}
