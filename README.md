# Cybersecurity Awareness Platform

Premium cybersecurity awareness website with interactive learning experiences and user authentication.

## Features

- 🔐 **Authentication System**: Login and signup functionality to track user progress
- 🛡️ **Protected Routes**: All main content requires authentication
- 📚 **Interactive Learning**: Explore cyber threats, practices, and challenges
- 🎯 **Cyber Lab**: Hands-on mission-based learning experience
- 📊 **Progress Tracking**: Monitor your cybersecurity awareness journey
- 🏆 **Challenge Mode**: Test your knowledge with interactive quizzes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Authentication

The platform now requires users to create an account and log in before accessing the content.

### First Time Users

1. Visit the website
2. You will be redirected to the login page
3. Click "Create an account" to sign up
4. Fill in your name, email, and password (minimum 6 characters)
5. After successful signup, you'll be automatically logged in

### Existing Users

1. Enter your email and password on the login page
2. Click "Sign in" to access your journey

### User Data Storage

Currently, user data is stored in the browser's localStorage for demonstration purposes. In a production environment, this should be replaced with a proper backend API with secure password hashing and database storage.

## Project Structure

```
src/
├── app/
│   └── pages/          # Page components (Login, Signup)
├── components/
│   ├── auth/           # Authentication components (ProtectedRoute)
│   ├── layout/         # Layout components (Header, Footer, AppShell)
│   ├── primitives/     # Base UI components (Button, Card, Badge)
│   ├── interactive/    # Interactive components (ProgressRing, SceneBackground)
│   └── ui/             # Complex UI components
├── contexts/           # React contexts (AuthContext)
├── sections/           # Main content sections
│   ├── HeroSection.tsx
│   ├── WhyMattersSection.tsx
│   ├── CommonThreatsSection.tsx
│   ├── InteractiveExperienceSection.tsx
│   ├── ProtectYourselfSection.tsx
│   ├── ImpactSection.tsx
│   └── ChallengeSection.tsx
└── styles/             # Global styles and theme
```

## Key Features Explained

### Authentication Context

The `AuthContext` (`src/contexts/AuthContext.tsx`) manages the authentication state across the application:
- Login functionality with email/password validation
- Signup with user creation
- User session management
- Logout functionality
- Protected route access control

### Protected Routes

All main content is protected by the `ProtectedRoute` component, which:
- Checks if the user is authenticated
- Redirects to login if not authenticated
- Allows access to content only if authenticated

### Main Sections

1. **Hero Section**: Eye-catching introduction with call-to-action
2. **Journey Section**: 5-step learning path overview
3. **Why Matters Section**: Interactive visualization of cybersecurity importance
4. **Common Threats Section**: Explore 12 common cyber threats with detailed information
5. **Interactive Experience Section**: Premium Cyber Lab with mission-based learning
6. **Protect Yourself Section**: 14 practical security habits with interactive checklist
7. **Impact Section**: Real-world statistics and global cybersecurity trends
8. **Challenge Section**: 5-question interactive quiz with certificate generation

## Technology Stack

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **React Router**: Client-side routing
- **CSS**: Custom styling with CSS variables

## User Interface Improvements

The following UI/UX improvements have been implemented:

1. **Authentication Flow**
   - Clean, modern login/signup pages
   - Real-time form validation
   - Clear error messages
   - Success states with auto-redirect

2. **Navigation**
   - User name displayed when logged in
   - Quick logout from header
   - Mobile-responsive menu
   - Fixed navigation issues

3. **Content Protection**
   - All main content requires authentication
   - Seamless redirect to login for unauthenticated users
   - Preserved navigation state after login

4. **Code Quality**
   - Removed unused imports
   - Fixed CSS syntax warnings
   - Clean TypeScript compilation
   - Optimized build output

## Development

To extend or modify the platform:

1. **Add New Sections**: Create components in `src/sections/`
2. **Modify Authentication**: Update `src/contexts/AuthContext.tsx`
3. **Style Changes**: Edit files in `src/styles/`
4. **Add Protected Pages**: Wrap routes with `<ProtectedRoute>`

## Future Enhancements

Consider these improvements for production:

- [ ] Backend API integration
- [ ] Secure password hashing (bcrypt)
- [ ] JWT token authentication
- [ ] Database for user data
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Progress persistence across devices
- [ ] Social login options
- [ ] HTTPS enforcement

## Credits

**Made By:**
- **Names**: Sania Pal, Swati Saxena
- **Roll Numbers**: 240962106047, 240962106055
- **College**: VMLG
- **Course/Year**: BCA 3rd Year

## License

This project is for educational purposes.
