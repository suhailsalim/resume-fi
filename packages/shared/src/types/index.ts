// User-related types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  fullName: string;
  phone?: string;
  email: string;
  location?: string;
  socials: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  summary?: string;
}

export interface Skill {
  name: string;
  rating: number; // 1-5
  category?: string;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export interface Certification {
  name: string;
  issuer: string;
  date: Date;
  url?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: Date;
  description?: string;
}

export interface Profile {
  userId: string;
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
}

// Job-related types
export interface JobAnalysis {
  matchScore: number;
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
  upskillingSuggestions: string[];
}

export interface Job {
  id: string;
  userId: string;
  title: string;
  company: string;
  location?: string;
  url?: string;
  description: string;
  analysis: JobAnalysis;
  createdAt: Date;
}

export type JobApplicationStatus = 'draft' | 'applied' | 'interviewing' | 'rejected' | 'offered' | 'accepted';

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  tailoredResume?: string;
  coverLetter?: string;
  status: JobApplicationStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Chat-related types
export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  userId: string;
  jobId: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}