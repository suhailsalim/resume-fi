# Resume-fy: Style Guide

## Brand Identity

### Core Values

- **Professional**: Instill confidence in users seeking career advancement
- **Supportive**: Create a feeling of guidance and assistance
- **Intelligent**: Convey the smart AI-powered nature of the platform
- **Fresh**: Modern approach to job applications

### Brand Voice

- Clear and concise communication
- Encouraging and motivational tone
- Professional but not stuffy
- Speaks to users as a knowledgeable career coach

## Visual Design

### Color Palette

#### Primary Colors

- **Deep Blue** (#2563EB): Primary brand color, conveys professionalism and trust
- **Fresh Green** (#10B981): Success, growth, and progress
- **White** (#FFFFFF): Clean background and space

#### Secondary Colors

- **Light Blue** (#93C5FD): Highlights, secondary elements
- **Navy** (#1E40AF): Depth for important elements
- **Gray Scale**:
  - Dark Gray (#1F2937): Text and headers
  - Medium Gray (#6B7280): Secondary text
  - Light Gray (#F3F4F6): Backgrounds and dividers

#### Accent Colors

- **Amber** (#F59E0B): Highlights, warnings, attention
- **Rose** (#F43F5E): Errors, critical information

### Typography

#### Font Families

- **Headings**: Inter (Sans-serif)

  ```css
  font-family: 'Inter', sans-serif;
  ```

- **Body Text**: Inter (Sans-serif)

  ```css
  font-family: 'Inter', sans-serif;
  ```

- **Code/Technical**: JetBrains Mono (Monospace)

  ```css
  font-family: 'JetBrains Mono', monospace;
  ```

#### Type Scale

- H1: 30px / 2rem, Bold
- H2: 24px / 1.5rem, Bold
- H3: 20px / 1.25rem, Semi-bold
- H4: 18px / 1.125rem, Semi-bold
- Body: 16px / 1rem, Regular
- Small/Caption: 14px / 0.875rem, Regular

#### Line Heights

- Headings: 1.2
- Body text: 1.5
- Buttons and small text: 1.25

### Spacing System

Follow an 8-point grid system:

- 4px - Extra small (0.25rem)
- 8px - Small (0.5rem)
- 16px - Base (1rem)
- 24px - Medium (1.5rem)
- 32px - Large (2rem)
- 48px - Extra large (3rem)
- 64px - 2x Extra large (4rem)

### Layout

#### Grid System

- 12-column grid
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

#### Container Widths

- Small: Max 640px
- Medium: Max 768px
- Large: Max 1024px
- Extra Large: Max 1280px

### Components

#### Buttons

##### Primary Button

- Background: Deep Blue (#2563EB)
- Text: White (#FFFFFF)
- Hover: Slightly darker blue (#1D4ED8)
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: Semi-bold

##### Secondary Button

- Background: White (#FFFFFF)
- Border: 1px solid Deep Blue (#2563EB)
- Text: Deep Blue (#2563EB)
- Hover: Light blue background (#EFF6FF)
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: Semi-bold

##### Tertiary Button / Text Button

- Background: Transparent
- Text: Deep Blue (#2563EB)
- Hover: Light blue background (#EFF6FF)
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: Medium

##### Disabled Button

- Background: Light Gray (#F3F4F6)
- Text: Medium Gray (#6B7280)
- Cursor: Not allowed

#### Form Elements

##### Input Fields

- Border: 1px solid Light Gray (#E5E7EB)
- Border Radius: 8px
- Padding: 12px 16px
- Focus: 2px border Deep Blue (#2563EB)
- Error: 2px border Rose (#F43F5E)

##### Dropdowns**

- Same styling as input fields
- Dropdown icon: Dark Gray (#1F2937)

##### Checkboxes & Radio Buttons

- Unchecked: 1px border Light Gray (#E5E7EB)
- Checked: Deep Blue (#2563EB) fill
- Size: 18px × 18px

#### Cards

##### Standard Card

- Background: White (#FFFFFF)
- Border: 1px solid Light Gray (#E5E7EB)
- Border Radius: 12px
- Shadow: 0px 4px 6px rgba(0, 0, 0, 0.05)
- Padding: 24px

##### Highlighted Card

- Same as standard + subtle blue background (#F0F9FF)
- Or left border accent: 4px solid Deep Blue (#2563EB)

#### Navigation

##### Main Navigation

- Background: White (#FFFFFF)
- Active item: Deep Blue (#2563EB)
- Inactive item: Dark Gray (#1F2937)
- Hover: Medium Gray (#6B7280)

##### Breadcrumbs

- Text: Medium Gray (#6B7280)
- Separator: Light Gray (#E5E7EB)
- Current Page: Dark Gray (#1F2937)

### Icons

Use a consistent icon set - Recommended: [Heroicons](https://heroicons.com/) or [Lucide](https://lucide.dev/)

- Size: 24px for standard UI elements
- Color: Match text color in context
- Weight: Regular weight (not too bold)

## Interactive Elements

### Hover States

- Subtle background color change
- 150-200ms transition duration
- Ease-in-out timing function

### Focus States

- Deep Blue (#2563EB) outline
- 2px width
- 2px offset from element edge

### Loading States

- Use subtle animations
- Skeleton screens for content loading
- Spinners for action buttons

### Feedback Indicators

- Success: Fresh Green (#10B981)
- Error: Rose (#F43F5E)
- Warning: Amber (#F59E0B)
- Info: Light Blue (#93C5FD)

## Data Visualization

### Charts and Graphs

- Use consistent color palette
- Clear labels and legends
- Responsive design (adapt to container width)
- Provide alternative text/data for accessibility

### Progress Indicators

- Use consistent color semantics:
  - High match: Fresh Green (#10B981)
  - Medium match: Amber (#F59E0B)
  - Low match: Rose (#F43F5E)

## Accessibility Guidelines

### Color Contrast

- Meet WCAG 2.1 AA standard (minimum 4.5:1 for normal text)
- Don't rely on color alone to convey information

### Text Sizes

- Minimum body text size: 16px
- Allow text to be resized up to 200% without breaking layout

### Focus Indicators

- Visible focus states for all interactive elements
- Don't remove default focus styles without replacement

### Semantic Markup

- Use proper heading hierarchy
- Label all form elements
- Add alt text to all images
- Use ARIA attributes where appropriate

## Animation and Motion

### Principles

- Keep animations subtle and purposeful
- Duration: 150-300ms for UI transitions
- Avoid animations that flash or move too quickly

### Types

- Fade in/out for appearance/disappearance
- Slide for panel transitions
- Scale for emphasis or focus
- Progress indicators for processes

## Responsive Design

### Mobile First Approach

- Design for mobile first, then enhance for larger screens
- Stack elements vertically on mobile
- Use bottom navigation on mobile

### Touch Targets

- Minimum touch target size: 44px × 44px
- Adequate spacing between interactive elements

### Content Adaptation

- Prioritize content on smaller screens
- Hide non-essential elements on mobile
- Use progressive disclosure for complex features

## Implementation Guidelines

### CSS Architecture

- Use CSS modules or styled components
- Follow BEM naming convention
- Create reusable utility classes for common patterns

### Design Token Implementation

- Implement design tokens for colors, spacing, typography
- Use CSS variables for easy theming
- Example:

  ```css
  :root {
    --color-primary: #2563EB;
    --color-success: #10B981;
    --spacing-base: 1rem;
    /* etc. */
  }
  ```

### Component Documentation

- Create a Storybook or similar documentation
- Document component props and variants
- Include usage examples
- Add accessibility notes

## User Experience Patterns

### Form Design

- Single column layout for forms
- Group related fields
- Show validation in real-time
- Clear error messages
- Save progress for multi-step forms

### Navigation Patterns

- Clear navigation hierarchy
- Breadcrumbs for deep navigation
- Back buttons where appropriate
- Persistent global navigation

### Empty States

- Provide helpful guidance in empty states
- Use illustrations to convey meaning
- Include clear calls to action

### Success/Error Handling

- Confirm successful actions
- Provide clear error messages
- Suggest solutions for errors
- Allow retry options

## Page Templates

### Dashboard Layout

- Quick summary stats at top
- Recent activity section
- Quick action buttons
- Progress indicators

### Profile Page Layout

- Profile completeness indicator
- Clear section organization
- Easy edit capabilities
- Preview mode

### Job Analysis Layout

- Job details summary
- Match score visualization
- Strengths/weaknesses sections
- Action recommendations
- Chat assistant access
