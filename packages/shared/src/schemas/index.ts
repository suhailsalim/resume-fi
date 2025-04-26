import { z } from 'zod';
import { JobApplicationStatus, ChatRole } from '../types';

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  photoURL: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Personal info schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email format'),
  location: z.string().optional(),
  socials: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    portfolio: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }),
  summary: z.string().optional(),
});

// Skill schema
export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  rating: z.number().min(1).max(5),
  category: z.string().optional(),
});

// Experience schema
export const experienceSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean(),
  description: z.string().min(1, 'Job description is required'),
});

// Project schema
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
  technologies: z.array(z.string()),
  url: z.string().url().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

// Education schema
export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.date(),
  endDate: z.date().optional(),
  gpa: z.number().min(0).max(4).optional(),
});

// Certification schema
export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.date(),
  url: z.string().url().optional(),
});

// Award schema
export const awardSchema = z.object({
  title: z.string().min(1, 'Award title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.date(),
  description: z.string().optional(),
});

// Profile schema
export const profileSchema = z.object({
  userId: z.string(),
  personalInfo: personalInfoSchema,
  skills: z.array(skillSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  education: z.array(educationSchema),
  certifications: z.array(certificationSchema),
  awards: z.array(awardSchema),
});

// Job analysis schema
export const jobAnalysisSchema = z.object({
  matchScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  gaps: z.array(z.string()),
  upskillingSuggestions: z.array(z.string()),
});

// Job schema
export const jobSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  url: z.string().url().optional(),
  description: z.string().min(1, 'Job description is required'),
  analysis: jobAnalysisSchema,
  createdAt: z.date(),
});

// Job application status schema
export const jobApplicationStatusSchema = z.enum([
  'draft',
  'applied',
  'interviewing',
  'rejected',
  'offered',
  'accepted',
]) as z.ZodType<JobApplicationStatus>;

// Job application schema
export const jobApplicationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jobId: z.string(),
  tailoredResume: z.string().optional(),
  coverLetter: z.string().optional(),
  status: jobApplicationStatusSchema,
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Chat role schema
export const chatRoleSchema = z.enum(['user', 'assistant']) as z.ZodType<ChatRole>;

// Chat message schema
export const chatMessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jobId: z.string(),
  role: chatRoleSchema,
  content: z.string().min(1, 'Message content is required'),
  timestamp: z.date(),
});

// API Request schemas
export const updateProfileRequestSchema = profileSchema.omit({ userId: true });

export const createJobRequestSchema = jobSchema
  .omit({ id: true, userId: true, analysis: true, createdAt: true })
  .extend({
    description: z.string().min(10, 'Job description must be at least 10 characters'),
  });

export const generateTailoredResumeRequestSchema = z.object({
  jobId: z.string(),
});

export const generateCoverLetterRequestSchema = z.object({
  jobId: z.string(),
});

export const sendChatMessageRequestSchema = z.object({
  jobId: z.string(),
  content: z.string().min(1, 'Message content is required'),
});