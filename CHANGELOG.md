# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed

- **Database Schema Issues**: Fixed game creation by aligning code with actual database schema
- **Game Type Validation**: Updated game types to match database constraints (`kings-cup`, `never-have-i-ever`, `custom-deck`)
- **Route Navigation**: Fixed redirect path from `/game/${id}` to `/${id}/dashboard`
- **Build Errors**: Resolved Tailwind CSS errors and removed unused code

### Added

- **Glossy UI Theme**: Implemented custom glossy styling with smooth animations
- **Parallax Background**: Added `bg-1.png` as global background with parallax effect
- **Icon Integration**: Added `icon-1.png` throughout the app for consistent branding
- **Mobile-First Design**: Improved responsive design and button styling
- **Custom 404 Page**: Created themed error page matching app design

### Changed

- **Folder Structure**: Reorganized to follow Next.js App Router best practices (moved components, hooks, lib inside `src`)
- **Button Styling**: Removed icons from buttons and applied consistent glossy theme
- **Login Layout**: Changed from row to column layout for better mobile experience
- **README**: Updated to be user-focused with game instructions rather than technical setup

## [0.1.0] - 2024-01-XX

### Added

- Complete SipStream implementation with authentication, real-time games, UI, and Supabase integration
- Added Netlify compatibility with configuration files
- Updated Next.js config for multi-platform deployment
- Added deployment instructions for both Vercel and Netlify
- Initial project setup with Next.js, TypeScript, Tailwind CSS, PrimeReact, PrimeFlex, PrimeIcons, Supabase, React Hook Form, and Zod
- Project structure and configuration
