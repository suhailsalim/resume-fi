# Resume-fi

Resume-fi is an AI-powered job application assistant that helps users optimize their job applications by analyzing job descriptions, matching them to user profiles, and generating tailored resumes and cover letters.

## Project Structure

The project is organized as a monorepo with three main packages:

- **shared**: Common types, schemas, and utilities used across the application
- **backend**: NestJS API server with Firebase/Firestore integration
- **frontend**: Next.js frontend application

## Technologies Used

### Backend

- NestJS framework
- Firebase Authentication & Firestore
- JWT for API authentication
- LangChain JS / LangGraph JS for AI workflows
- Google Gemini 2.5 Pro for AI features

### Frontend

- Next.js (App Router)
- React Query for data fetching
- Firebase Authentication
- Tailwind CSS for styling
- shadcn/ui component library

## Getting Started

### Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher
- Firebase project with Authentication and Firestore set up
- Google AI API Key (Gemini 2.5 Pro)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/resume-fi.git
   cd resume-fi
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` in both the backend and frontend packages.
   - Fill in the required environment variables with your Firebase and Google AI credentials.

4. Start the development servers

   ```bash
   # Start backend
   npm run dev:backend
   
   # Start frontend (in a new terminal)
   npm run dev:frontend
   ```

5. Access the application at `http://localhost:3000`

## Features

- **User Authentication**: Secure login with Google
- **Resume Analysis**: AI-powered parsing and structuring of resume information
- **Job Description Analysis**: Match job requirements to user profile
- **Tailored Documents**: Generate customized resumes and cover letters based on specific job requirements
- **AI Chat Assistant**: Get personalized advice for specific job applications

## Documentation

- [Product Requirements Document](./Product%20requirements%20document.md)
- [Technical Specifications Document](./Technical%20specifications%20document.md)
- [Styles Guide Document](./Styles%20guide%20document.md)
- [Prerequisites and Deployment Plan](./Prerequisites%20and%20Deployment%20plan.md)

## License

This project is licensed under the MIT License.
