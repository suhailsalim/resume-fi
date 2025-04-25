# Product Requirements Document: Resume-fy

## Product Overview

Resume-fy is a full-stack web application designed to help job seekers optimize their job application process. The application provides intelligent resume analysis, job description matching, and personalized recommendations to improve job application success rates.

## Target Audience

- Job seekers at all career levels
- Career changers looking to transition to new roles
- Recent graduates entering the job market
- Professionals seeking career advancement

## Key Features

### 1. User Authentication & Profile Management

- Google Authentication integration
- Secure user profiles
- Resume upload and parsing functionality
- Manual profile editing capabilities

### 2. Resume Analysis

- Automated extraction of user details from uploaded resumes
- Structured storage of:
  - Personal information (name, contact details, socials)
  - Skills with proficiency ratings
  - Work experience
  - Projects
  - Education
  - Certifications
  - Awards and achievements

### 3. Job Description Analysis

- Job URL or JD text input functionality
- AI-powered job-to-resume matching
- Detailed compatibility analysis
- Gap identification

### 4. Personalized Recommendations

- Upskilling suggestions based on identified gaps
- Custom-tailored resume generation for specific job applications
- Cover letter generation optimized for the targeted position
- Keyword optimization based on job requirements

### 5. Interactive Support

- AI chat assistant for job-related queries
- Guided application improvement process

## User Flows

### User Registration & Profile Setup

1. User signs in with Google account
2. User completes profile information
3. User uploads resume or manually enters details
4. System extracts and structures resume data
5. User reviews and confirms profile information

### Job Matching Process

1. User inputs job description (via URL or text paste)
2. System analyzes job requirements against user profile
3. System generates compatibility report
4. System provides customized recommendations
5. User can generate tailored resume and cover letter
6. User can ask follow-up questions via chat assistant

## Non-Functional Requirements

### Performance

- Resume parsing completed within 5 seconds
- Job analysis completed within 10 seconds
- Page load times under 2 seconds

### Security

- Secure authentication and data storage
- API authentication for all endpoints
- Data encryption for sensitive information

### Scalability

- Support for concurrent users
- Efficient database design for quick retrieval

### Usability

- Intuitive, modern UI design
- Mobile-responsive interface
- Clear navigation and user guidance

## Technical Requirements

- NestJS backend
- Firestore database
- React/NextJS frontend
- Google Authentication
- Tailwind CSS for styling
- shadcn/ui component library
- LangChain JS for AI integration (Gemini 2.5 Pro Experimental)
- LangGraph JS for agent workflows
- Zod for schema validation

## Success Metrics

- User registration rate
- Resume upload completion rate
- Job matching request frequency
- Tailored resume generation rate
- User retention and engagement metrics
