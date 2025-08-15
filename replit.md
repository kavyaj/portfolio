# Overview

This is an exact recreation of the Kavya.wiki personal portfolio website using pure HTML/CSS/JS. The project recreates the complete design, layout, and content of the original site with precise typography matching using Big Shoulders Display font, exact color scheme (#fd5183 primary pink), and all interactive elements. Built as a static website for easy hosting on Replit with clean, semantic code structure.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation integration

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with /api prefix for all endpoints
- **Request Processing**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with tsx for TypeScript execution

## Database & ORM
- **Database**: PostgreSQL with connection through environment variable
- **ORM**: Drizzle ORM for type-safe database queries
- **Schema Management**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema migrations
- **Validation**: Drizzle-Zod integration for runtime schema validation

## Data Storage Strategy
- **Production**: PostgreSQL database (configured for Neon serverless)
- **Development**: In-memory storage with interface-based abstraction
- **Storage Interface**: Abstracted storage layer allowing easy switching between implementations
- **Session Management**: PostgreSQL session store with connect-pg-simple

## Build & Development
- **Frontend Build**: Vite with React plugin and TypeScript support
- **Backend Build**: esbuild for production bundling
- **Development Server**: Integrated Vite dev server with Express API proxy
- **Static Assets**: Served through Vite in development, static files in production
- **Hot Reload**: Full stack hot reload in development environment

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **PostgreSQL**: Primary database with session storage support

## UI & Component Libraries
- **Radix UI**: Comprehensive primitive component library
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component implementation

## Development & Build Tools
- **Vite**: Frontend build tool with React support
- **esbuild**: Backend production bundling
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **tsx**: TypeScript execution for development

## Styling & Design
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management
- **clsx**: Conditional className utility

## Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **cmdk**: Command palette functionality
- **nanoid**: Unique ID generation