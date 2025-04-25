# Technical Specification Document: Resume-fy

## Architecture Overview

Resume-fy will follow a modern full-stack architecture with clear separation of concerns:

```plaintext
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React/Next.js  │◄────┤    NestJS API   │◄────┤    Firestore    │
│    Frontend     │     │     Backend     │     │    Database     │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │
         │                       │
         │               ┌───────▼───────┐
         │               │    AI Layer   │
         └───────────────┤  LangChain JS │
                         │  LangGraph JS │
                         └───────────────┘
```

## Backend Implementation (NestJS)

### Core Modules

1. **Authentication Module**
   - Google OAuth2 integration
   - JWT token generation and validation
   - Auth guards for API protection

2. **User Module**
   - User profile management
   - Resume data extraction and storage
   - Profile CRUD operations

3. **Resume Analysis Module**
   - Resume parsing service
   - Data extraction and structure mapping
   - Skills categorization and rating

4. **Job Analysis Module**
   - Job description parsing
   - Match scoring algorithm
   - Gap analysis implementation

5. **AI Integration Module**
   - LangChain JS integration with Gemini 2.5 Pro
   - LangGraph JS agent workflows
   - Prompt management system

### API Endpoints

#### Authentication

- `POST /auth/google/login` - Initiate Google auth flow
- `POST /auth/google/callback` - Handle Google auth callback
- `POST /auth/refresh` - Refresh JWT token

#### User Profile

- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile
- `POST /users/resume` - Upload and process resume
- `GET /users/resume` - Get processed resume data

#### Job Analysis

- `POST /jobs/analyze` - Submit job for analysis
- `GET /jobs/analysis/:id` - Get job analysis results
- `POST /jobs/tailored-resume` - Generate tailored resume
- `POST /jobs/cover-letter` - Generate cover letter

#### Chat Support

- `POST /chat/message` - Send message to AI assistant
- `GET /chat/history/:jobId` - Get chat history for job

### Database Schema (Firestore)

#### Users Collection

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Profiles Collection

```typescript
interface Profile {
  userId: string;
  personalInfo: {
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
  };
  skills: Array<{
    name: string;
    rating: number; // 1-5
    category?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate?: Timestamp;
    endDate?: Timestamp;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    gpa?: number;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: Timestamp;
    url?: string;
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    date: Timestamp;
    description?: string;
  }>;
}
```

#### Jobs Collection

```typescript
interface Job {
  id: string;
  userId: string;
  title: string;
  company: string;
  location?: string;
  url?: string;
  description: string;
  analysis: {
    matchScore: number;
    strengths: string[];
    weaknesses: string[];
    gaps: string[];
    upskillingSuggestions: string[];
  };
  createdAt: Timestamp;
}
```

#### JobApplications Collection

```typescript
interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  tailoredResume?: string;
  coverLetter?: string;
  status: 'draft' | 'applied' | 'interviewing' | 'rejected' | 'offered' | 'accepted';
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### ChatMessages Collection

```typescript
interface ChatMessage {
  id: string;
  userId: string;
  jobId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}
```

## Frontend Implementation (Next.js)

### Component Structure

```plaintext
src/
├── app/                  # App router
│   ├── page.tsx          # Landing page
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── profile/          # Profile management
│   └── jobs/             # Job analysis
├── components/           # Shared components
│   ├── ui/               # UI components (shadcn/ui components)
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/             # API services
└── styles/               # Global styles
```

### Key Pages

1. **Landing Page** - Introduction and value proposition
2. **Authentication Pages** - Login with Google
3. **Dashboard** - Overview of profile completeness and job matches
4. **Profile Management** - Resume upload and profile editing
5. **Job Analysis** - Job description input and analysis results
6. **Tailored Application** - Resume and cover letter generation
7. **Chat Assistant** - Job-specific chat interface

### State Management

- Use React Context API for global state
- React Query for server state management and caching
- Zod for form validation and type safety

### UI Component Library

- **shadcn/ui**: Used for pre-built, accessible components
  - Implementation of robust, reusable UI components based on Radix UI
  - Fully customizable via Tailwind CSS
  - Maintains consistent design system with accessibility built-in
- **Tailwind CSS**: Core styling framework for custom components and layouts

## AI Integration (LangChain JS & LangGraph JS)

### AI Components

1. **ResumeParser Agent**
   - Extract structured data from resume text/PDF
   - Categorize and rate skills
   - Summarize experiences

2. **JobAnalyzer Agent**
   - Extract key requirements from job descriptions
   - Identify required skills, experience, and qualifications
   - Compare against user profile

3. **MatchScorer Agent**
   - Evaluate match percentage
   - Identify strengths and weaknesses
   - Determine skill and experience gaps

4. **RecommendationAgent**
   - Generate upskilling recommendations
   - Create personalized learning paths
   - Suggest specific resources

5. **ResumeGenerator Agent**
   - Create tailored resume based on job requirements
   - Highlight relevant experience and skills
   - Incorporate key terms from job description

6. **CoverLetterGenerator Agent**
   - Generate personalized cover letters
   - Address company-specific values and needs
   - Highlight relevant qualifications

7. **ChatAssistant Agent**
   - Answer user questions about specific jobs
   - Provide application advice
   - Suggest improvements to application materials

### LangGraph Implementation

```typescript
// Example LangGraph workflow for job analysis
const jobAnalysisWorkflow = defineGraph({
  nodes: {
    jobParser: createJobParserNode(),
    profileAnalyzer: createProfileAnalyzerNode(),
    matchScorer: createMatchScorerNode(),
    gapAnalyzer: createGapAnalyzerNode(),
    recommendationEngine: createRecommendationNode()
  },
  edges: {
    jobParser: ['profileAnalyzer'],
    profileAnalyzer: ['matchScorer'],
    matchScorer: ['gapAnalyzer'],
    gapAnalyzer: ['recommendationEngine']
  }
});
```

## Security Considerations

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control
   - API guards for all endpoints

2. **Data Protection**
   - Encryption of sensitive data
   - Secure storage of AI credentials
   - Input validation and sanitization

3. **API Security**
   - Rate limiting
   - CORS configuration
   - XSS and CSRF protection

## Testing Strategy

1. **Unit Tests**
   - Testing individual components and functions
   - Jest for backend testing
   - React Testing Library for frontend

2. **Integration Tests**
   - API endpoint testing
   - Database interaction testing
   - Authentication flow testing

3. **E2E Tests**
   - Cypress for full user flow testing
   - Critical path testing

## Deployment Strategy

1. **CI/CD Pipeline**
   - GitHub Actions for automated testing and deployment
   - Separate staging and production environments

2. **Infrastructure**
   - Backend: Cloud Run or similar serverless platform
   - Frontend: Static hosting (Vercel/Netlify)
   - Database: Cloud Firestore
   - AI Services: Properly rate-limited and monitored

3. **Monitoring**
   - Error tracking with Sentry
   - Performance monitoring
   - Usage analytics
