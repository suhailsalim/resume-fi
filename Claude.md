# Claude Code Prompt: Resume-fy UI Implementation

I'm building a full-stack web application called "Resume-fy" using Next.js, Tailwind CSS, and shadcn/ui components. The application helps users prepare for job applications by analyzing their resumes against job descriptions.

## Project Structure

- Next.js app router
- Tailwind CSS for styling
- shadcn/ui for UI components
- Firestore for database
- Google Authentication

## Required Components

Please help me implement the following UI components:

### 1. Authentication Components

Create a sign-in page with Google authentication that aligns with our style guide:

- Primary color: Deep Blue (#2563EB)
- Secondary color: Fresh Green (#10B981)
- Typography: Inter font family
- Modern, clean design with appropriate shadcn/ui components

Include:

- Google sign-in button
- App logo and branding
- Brief value proposition text

### 2. Dashboard Layout

Create a dashboard layout with:

- Sidebar navigation with links to:
  - Dashboard (home)
  - Profile
  - Job Matching
  - Saved Jobs
  - Settings
- Responsive design that collapses to bottom navigation on mobile
- Top header with user profile menu
- Main content area

### 3. Profile Page Components

Design components for:

- Resume upload section with drag-and-drop functionality
- Profile completion indicator
- Form sections for:
  - Personal Information
  - Skills (with rating input)
  - Experience (with ability to add multiple entries)
  - Projects
  - Education
  - Certifications
- Preview mode for viewing the structured profile data

### 4. Job Analysis Interface

Create components for:

- Job description input (URL or text paste)
- Job match visualization (score and chart)
- Strengths/weaknesses/gaps display
- Recommendation sections
- Action buttons for generating tailored resume and cover letter

### 5. Chat Interface

Design a chat interface for the job matching page:

- Message bubble components
- Input area with send button
- Typing indicators
- History display

## Implementation Requirements

1. Use shadcn/ui components appropriately:
   - Button
   - Card
   - Dialog
   - Form
   - Input
   - Select
   - Tabs
   - Toast
   - Progress
   - Avatar
   - etc.

2. Extend and customize shadcn/ui as needed to match our style guide:
   - Customize colors
   - Adjust typography
   - Modify spacing

3. Implement responsive design:
   - Mobile-first approach
   - Appropriate layout changes at breakpoints
   - Touch-friendly elements on mobile

4. Follow accessibility best practices:
   - Semantic HTML
   - ARIA attributes where necessary
   - Keyboard navigation
   - Sufficient color contrast

5. Create reusable components where appropriate:
   - Form field wrappers
   - Section containers
   - Rating inputs
   - Timeline displays

## Examples and References

For each component, please provide:

1. The complete code including both JSX and Tailwind styling
2. Any necessary TypeScript interfaces or types
3. Explanations for customizations to shadcn/ui components
4. Notes on component interactions and state management

## Additional Notes

- Focus on clean, modern design with appropriate whitespace
- Use animations sparingly and purposefully
- Keep performance in mind, especially for form components with many fields
- Provide prop documentation for custom components
