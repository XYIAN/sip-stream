# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Complete Friends System**: Full social networking with friend requests, search, and management
- **Real-time Notifications**: Live notifications for friend requests, game invitations, and game updates
- **User Profiles**: User status tracking (online, offline, in_game, away) with real-time updates
- **Game Invitations**: Send and receive game invitations with accept/decline functionality
- **Friends List Component**: Search, add, remove friends with online status indicators
- **Notifications Panel**: Real-time notification center with action buttons for friend requests and game invites
- **Game Tips System**: Dynamic tips display at the bottom of games with rotating game-specific advice
- **Enhanced Game Dashboard**: Added friends and notifications buttons to game interface
- **useFriends Hook**: Comprehensive hook for managing friends, profiles, and notifications
- **Database Triggers**: Automatic notification creation for friend requests and game invitations
- **Real-time Status Updates**: Users' online/game status updates in real-time

### Database Schema

- **user_profiles table**: User information, status, and game tracking
- **friends table**: Friend relationships with pending/accepted status
- **notifications table**: Real-time notifications with action requirements
- **game_invitations table**: Game invitation system with expiration
- **Database Triggers**: Automatic notification and status management
- **Row Level Security**: Proper security policies for all new tables
- **Real-time Subscriptions**: All new tables enabled for real-time updates

### Enhanced Multiplayer Features

- **Live Friend Status**: See when friends are online, in game, or away
- **Game Invitation System**: Invite friends to join your games
- **Friend Request Management**: Accept/decline friend requests with notifications
- **Real-time Game Updates**: All players see game changes instantly
- **Interactive Notifications**: Click-to-action notifications for friend requests and game invites
- **Game Tips**: Contextual tips for each game type that rotate during gameplay

### UI/UX Improvements

- **Social Navigation**: Friends and notifications buttons in game dashboard
- **Status Indicators**: Visual indicators for friend online status and game participation
- **Notification Badges**: Unread notification counts
- **Game Tips Display**: Rotating tips at bottom of game screen
- **Mobile-First Design**: All new components optimized for mobile devices
- **Smooth Animations**: Enhanced transitions and interactions

### Fixed

- **Database Schema Issues**: Fixed game creation by aligning code with actual database schema
- **Game Type Validation**: Updated game types to match database constraints (`kings-cup`, `never-have-i-ever`, `custom-deck`)
- **Route Navigation**: Fixed redirect path from `/game/${id}` to `/${id}/dashboard`
- **Build Errors**: Resolved Tailwind CSS errors and removed unused code

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
