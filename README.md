# 🗨️ Interactive Comment System

> A full-stack web application featuring a modern, nested comment system with authentication, Google OAuth, avatar uploads, and real-time upvoting functionality built with React and Node.js.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.16-blue.svg)](https://mui.com/)

---

## � Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration Guide](#configuration-guide)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Key Features Explained](#key-features-explained)
- [Security Features](#security-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project is a production-ready, full-stack interactive comment system designed for modern web applications. It provides a seamless user experience with features like nested comments (unlimited depth), real-time upvoting, user authentication via JWT and Google OAuth, and cloud-based image storage.

**Perfect for:**
- Blog platforms
- Discussion forums
- Social media applications
- Educational platforms
- Community-driven websites

---

## ✨ Features

### 🔐 User Authentication
- **JWT-based Authentication**: Secure access tokens (15 min) and refresh tokens (7 days)
- **Google OAuth 2.0**: One-click sign-in with Google accounts
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Automatic token refresh and persistent login
- **Secure Cookies**: HTTP-only cookies for refresh tokens

### 💬 Comment System
- **Nested Comments**: Unlimited reply depth with visual indentation
- **Real-time Upvoting**: Toggle upvotes with instant UI feedback
- **Single Vote Per User**: Prevents vote manipulation
- **Optimistic Updates**: Instant UI changes with server confirmation
- **Anonymous Viewing**: Browse comments without authentication
- **Rich User Context**: Display usernames and avatars with each comment

### 👤 User Profiles
- **Avatar Upload**: Image upload with automatic cloud storage via Cloudinary
- **Profile Management**: Update user information
- **Visual Identity**: Custom avatars or color-coded initials

### 🎨 Modern UI/UX
- **Material-UI Components**: Beautiful, responsive design
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Semantic HTML and ARIA labels
- **Empty States**: Helpful messages when no content exists

---

## 🛠️ Tech Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express** | 5.1.0 | Web framework |
| **MongoDB** | Atlas | NoSQL database |
| **Mongoose** | 8.19.1 | ODM for MongoDB |
| **JWT** | Latest | Token-based authentication |
| **bcrypt** | Latest | Password hashing |
| **Google Auth Library** | Latest | OAuth 2.0 verification |
| **Multer** | Latest | File upload middleware |
| **Cloudinary** | Latest | Cloud image storage |
| **CORS** | Latest | Cross-origin resource sharing |
| **dotenv** | Latest | Environment variables |
| **cookie-parser** | Latest | Cookie parsing |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **Material-UI** | 5.14.16 | Component library |
| **React Router** | 6.20.0 | Client-side routing |
| **Axios** | 1.6.2 | HTTP client |
| **@react-oauth/google** | Latest | Google OAuth integration |
| **React Context API** | Built-in | State management |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React App (Port 3000)                               │  │
│  │  - Material-UI Components                            │  │
│  │  - Context Providers (Auth, Comments)                │  │
│  │  - Axios Interceptors (Token Injection)              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express Server (Port 3000)                          │  │
│  │  - CORS Middleware                                   │  │
│  │  - Authentication Middleware (JWT)                   │  │
│  │  - File Upload Middleware (Multer)                   │  │
│  │  - API Routes                                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌──────────────────┴──────────────────┐
        ↓                                      ↓
┌───────────────────┐              ┌──────────────────────┐
│  MongoDB Atlas    │              │  Cloudinary CDN      │
│  - Users          │              │  - Avatar Images     │
│  - Comments       │              │  - Static Assets     │
│  - Indexes        │              └──────────────────────┘
└───────────────────┘
        ↓
┌───────────────────┐
│  Google OAuth API │
│  - User Verify    │
└───────────────────┘
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed and configured:

### Required Software
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

### Required Accounts
1. **MongoDB Atlas** - [Sign up](https://www.mongodb.com/cloud/atlas/register)
   - Create a free cluster
   - Whitelist your IP address
   - Create a database user

2. **Cloudinary** - [Sign up](https://cloudinary.com/users/register/free)
   - Get your cloud name, API key, and API secret
   - Free tier: 25 GB storage, 25 GB bandwidth

3. **Google Cloud Console** - [Sign up](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ayushaggarwal1277/interactive-comment-system.git
cd interactive-comment-system
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# This will install:
# - express, mongoose, jsonwebtoken, bcrypt
# - google-auth-library, multer, cloudinary
# - cors, cookie-parser, dotenv
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd Frontend

# Install dependencies
npm install

# This will install:
# - react, react-dom, react-router-dom
# - @mui/material, @emotion/react, @emotion/styled
# - axios, @react-oauth/google
```

---

## ⚙️ Configuration Guide

### Backend Configuration

1. **Create `.env` file** in the `Backend` directory:

```bash
cd Backend
copy .env.example .env  # Windows
# or
cp .env.example .env    # Mac/Linux
```

2. **Configure Environment Variables**:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
# Get this from MongoDB Atlas → Connect → Connect your application
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Secrets (Generate strong random strings)
# You can use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
ACCESS_TOKEN_SECRET=your_very_long_random_string_here
REFRESH_TOKEN_SECRET=another_very_long_random_string_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Google OAuth Configuration
# Get these from Google Cloud Console → APIs & Services → Credentials
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Cloudinary Configuration
# Get these from Cloudinary Dashboard → Account Details
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret_here
```

### Frontend Configuration

1. **Create `.env` file** in the `Frontend` directory:

```bash
cd Frontend
copy .env.example .env  # Windows
# or
cp .env.example .env    # Mac/Linux
```

2. **Configure Environment Variables**:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:3000

# Google OAuth Client ID (same as backend)
REACT_APP_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

### Detailed Configuration Steps

#### 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Create" → "Deploy a cluster" → Choose "Free Shared"
3. Select your cloud provider and region
4. Click "Create Cluster" (wait 1-3 minutes)
5. Click "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `adminUser` (or your choice)
   - Password: Generate a secure password
   - User Privileges: "Atlas admin"
   - Click "Add User"
6. Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for better security
7. Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with your database name (e.g., `commentSystem`)

#### ☁️ Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. After login, go to Dashboard
3. Copy these values:
   - **Cloud Name**: Found at the top
   - **API Key**: Found under "Account Details"
   - **API Secret**: Click "eye" icon to reveal
4. Paste these into your Backend `.env` file

#### 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click "Select a project" → "New Project"
   - Project name: "Comment System"
   - Click "Create"
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen:
     - User Type: External
     - App name: "Interactive Comment System"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue" through all steps
   - Application type: "Web application"
   - Name: "Comment System Web Client"
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     http://localhost:3001
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/users/google-login
     http://localhost:3001/login
     ```
   - Click "Create"
5. Copy "Client ID" and "Client Secret" to both Backend and Frontend `.env` files

---

## � Running the Application

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd Backend
node index.js

# Expected output:
# [dotenv] injecting env (9) from .env
# MongoDB connected successfully
# Database connected successfully
# Server is running on port 3000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm start

# Your browser will automatically open to http://localhost:3001
# (Port 3001 because backend is using 3000)
```

### Option 2: Using VS Code

1. Open the project in VS Code
2. Open integrated terminal (Ctrl + ` or Cmd + `)
3. Split terminal (click the split icon)
4. In left terminal: `cd Backend && node index.js`
5. In right terminal: `cd Frontend && npm start`

### Verify Everything is Working

1. **Backend Health Check**:
   - Open browser: `http://localhost:3000/api/users/current-user`
   - Should see: Authentication error (expected, since you're not logged in)

2. **Frontend Load Check**:
   - Browser should auto-open to `http://localhost:3001`
   - You should see the login page

3. **Database Connection**:
   - Check backend terminal for "MongoDB connected successfully"

---

## 📁 Project Structure

```
INTER_IIT_TM/
│
├── Backend/                          # Node.js + Express Server
│   ├── controllers/                  # Request handlers (business logic)
│   │   ├── comment.controllers.js    # Comment CRUD, upvote toggle, nested replies
│   │   └── user.controllers.js       # Auth, registration, Google OAuth, profile
│   │
│   ├── middlewares/                  # Custom middleware functions
│   │   ├── auth.middleware.js        # JWT verification (verifyJWT, optionalAuth)
│   │   └── multer.middleware.js      # File upload handling & validation
│   │
│   ├── models/                       # Mongoose schemas (MongoDB)
│   │   ├── comment.models.js         # Comment schema with upvotedBy tracking
│   │   └── user.models.js            # User schema with JWT token methods
│   │
│   ├── routes/                       # Express route definitions
│   │   ├── comment.routes.js         # /api/comments/* endpoints
│   │   └── user.routes.js            # /api/users/* endpoints
│   │
│   ├── utils/                        # Helper functions & utilities
│   │   ├── asyncHandler.js           # Async error handling wrapper
│   │   ├── cloudinary.js             # Cloudinary upload configuration
│   │   └── db.js                     # MongoDB connection setup
│   │
│   ├── uploads/                      # Temporary file storage (cleared after upload)
│   │   └── .gitkeep                  # Preserve empty directory in git
│   │
│   ├── .env                          # Environment variables (NOT in git)
│   ├── .env.example                  # Template for environment variables
│   ├── .gitignore                    # Files to exclude from git
│   ├── app.js                        # Express app configuration & middleware
│   ├── index.js                      # Server entry point & startup
│   └── package.json                  # Backend dependencies
│
├── Frontend/                         # React 18 Application
│   ├── public/                       # Static assets
│   │   └── index.html                # HTML template
│   │
│   ├── src/                          # React source code
│   │   ├── components/               # Reusable React components
│   │   │   │
│   │   │   ├── auth/                 # Authentication components
│   │   │   │   └── AuthForm.js       # Login/Register with Google OAuth button
│   │   │   │
│   │   │   ├── comments/             # Comment system components
│   │   │   │   ├── Comment.js        # Individual comment display
│   │   │   │   ├── CommentForm.js    # Create new comment form
│   │   │   │   ├── CommentThread.js  # Recursive nested comment tree
│   │   │   │   ├── ReplyInput.js     # Inline reply form
│   │   │   │   └── UpvoteButton.js   # Interactive upvote button
│   │   │   │
│   │   │   ├── common/               # Shared UI components
│   │   │   │   ├── EmptyState.js     # No data placeholder
│   │   │   │   ├── ErrorMessage.js   # Error alert display
│   │   │   │   ├── LoadingSpinner.js # Loading indicator
│   │   │   │   └── UserAvatar.js     # User profile picture/initials
│   │   │   │
│   │   │   ├── layout/               # Layout components
│   │   │   │   ├── Layout.js         # Main app wrapper
│   │   │   │   └── Navbar.js         # Top navigation bar
│   │   │   │
│   │   │   └── post/                 # Post components
│   │   │       └── Post.js           # Static post display
│   │   │
│   │   ├── context/                  # React Context providers
│   │   │   ├── AuthContext.js        # Authentication state & methods
│   │   │   └── CommentsContext.js    # Comments state & CRUD operations
│   │   │
│   │   ├── pages/                    # Page-level components
│   │   │   ├── HomePage.js           # Main page (post + comments)
│   │   │   └── LoginPage.js          # Authentication page
│   │   │
│   │   ├── services/                 # API communication layer
│   │   │   ├── api.js                # Axios setup with interceptors
│   │   │   └── apiService.js         # API method wrappers
│   │   │
│   │   ├── App.js                    # Root component with routing
│   │   ├── index.css                 # Global CSS styles
│   │   └── index.js                  # React app entry point
│   │
│   ├── .env                          # Frontend environment variables (NOT in git)
│   ├── .env.example                  # Template for frontend env variables
│   ├── .gitignore                    # Frontend git ignore rules
│   ├── package.json                  # Frontend dependencies
│   └── README.md                     # Frontend-specific documentation
│
├── .gitignore                        # Root-level git ignore rules
├── GITHUB_UPLOAD_GUIDE.md            # GitHub upload instructions
└── README.md                         # This file (main documentation)
```

### Key Files Explained

#### Backend Core Files

**`app.js`** - Express application setup
- CORS configuration with multiple origins
- Cookie parser for refresh token handling
- JSON and URL-encoded body parsers
- Route mounting (`/api/users`, `/api/comments`)
- Global error handling middleware

**`index.js`** - Server initialization
- Environment variable loading with dotenv
- MongoDB database connection
- Server startup on configured port
- Error handling for startup failures

**`models/user.models.js`** - User data structure
```javascript
{
  username: String (unique, indexed),
  email: String (unique, indexed),
  password: String (bcrypt hashed),
  avatar: String (Cloudinary URL or null),
  googleId: String (optional, for OAuth users),
  refreshToken: String (current valid refresh token)
}
// Instance methods:
// - generateAccessToken(): Creates JWT (15min)
// - generateRefreshToken(): Creates JWT (7days)
// - isPasswordCorrect(password): Compares with bcrypt
```

**`models/comment.models.js`** - Comment data structure
```javascript
{
  text: String (required),
  upvotes: Number (default: 0),
  upvotedBy: [ObjectId] (array of User IDs who upvoted),
  userId: ObjectId (reference to User),
  postId: String (post identifier),
  parentId: ObjectId (reference to parent Comment, null for top-level),
  createdAt: Date (auto-generated timestamp)
}
```

**`middlewares/auth.middleware.js`** - Authentication guards
- `verifyJWT`: Requires valid access token, throws 401 if missing/invalid
- `optionalAuth`: Attaches user to request if token exists, continues with null if not
- Token extraction from Authorization header
- JWT signature and expiry validation

#### Frontend Core Files

**`context/AuthContext.js`** - Authentication state management
- User login/logout functions
- Token storage in localStorage
- Automatic token refresh on expiry
- Google OAuth integration
- Current user fetching
- Protected route handling

**`context/CommentsContext.js`** - Comment state management
- Fetch comments with nested structure
- Create new comment
- Add reply to existing comment
- Toggle upvote with optimistic UI updates
- Real-time synchronization with backend
- Error handling and rollback

**`services/api.js`** - Axios HTTP client configuration
- Base URL configuration from environment
- Request interceptor: Auto-inject access token from localStorage
- Response interceptor: Handle 401 errors, auto-refresh token
- FormData Content-Type handling for file uploads
- Credentials included for cookie-based refresh tokens

---

## � API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /api/users/register
Content-Type: multipart/form-data

Body:
  - username: string (required)
  - email: string (required)
  - password: string (required, min 6 chars)
  - avatar: file (optional, jpg/png, max 5MB)

Response: {
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "...",
      "username": "john_doe",
      "email": "john@example.com",
      "avatar": "https://res.cloudinary.com/..."
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

Body: {
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "statusCode": 200,
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

#### Google OAuth Login
```http
POST /api/users/google-login
Content-Type: application/json

Body: {
  "credential": "google_jwt_token_here"
}

Response: {
  "statusCode": 200,
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

#### Get Current User
```http
GET /api/users/current-user
Authorization: Bearer <access_token>

Response: {
  "statusCode": 200,
  "data": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "..."
  },
  "success": true
}
```

#### Logout
```http
POST /api/users/logout
Authorization: Bearer <access_token>

Response: {
  "statusCode": 200,
  "message": "User logged out successfully",
  "success": true
}
```

#### Refresh Access Token
```http
POST /api/users/refresh-token
Cookie: refreshToken=<refresh_token>

Response: {
  "statusCode": 200,
  "data": {
    "accessToken": "new_access_token_here",
    "refreshToken": "new_refresh_token_here"
  },
  "success": true
}
```

### Comment Endpoints

#### Get All Comments
```http
GET /api/comments/:postId
Authorization: Bearer <access_token> (optional)

Response: {
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "text": "Great post!",
      "upvotes": 5,
      "isUpvoted": true,  // Only if authenticated
      "createdAt": "2025-01-15T10:30:00.000Z",
      "userId": {
        "_id": "...",
        "username": "john_doe",
        "avatar": "..."
      },
      "replies": [
        {
          "_id": "...",
          "text": "Thanks!",
          "upvotes": 2,
          "isUpvoted": false,
          // ... nested structure
        }
      ]
    }
  ],
  "success": true
}
```

#### Create Comment
```http
POST /api/comments
Authorization: Bearer <access_token>
Content-Type: application/json

Body: {
  "text": "This is my comment",
  "postId": "post_id_here"
}

Response: {
  "statusCode": 201,
  "data": {
    "_id": "...",
    "text": "This is my comment",
    "upvotes": 0,
    "userId": "...",
    "postId": "...",
    "createdAt": "..."
  },
  "message": "Comment created successfully",
  "success": true
}
```

#### Reply to Comment
```http
POST /api/comments/:commentId/reply
Authorization: Bearer <access_token>
Content-Type: application/json

Body: {
  "text": "This is my reply"
}

Response: {
  "statusCode": 201,
  "data": {
    "_id": "...",
    "text": "This is my reply",
    "parentId": "comment_id_here",
    // ... rest of comment data
  },
  "message": "Reply added successfully",
  "success": true
}
```

#### Toggle Upvote
```http
POST /api/comments/:commentId/upvote
Authorization: Bearer <access_token>

Response: {
  "statusCode": 200,
  "data": {
    "_id": "...",
    "upvotes": 6,
    "isUpvoted": true  // true if just upvoted, false if removed
  },
  "message": "Upvote toggled successfully",
  "success": true
}
```

### Error Responses

All endpoints return errors in this format:
```json
{
  "statusCode": 400,
  "message": "Error description here",
  "success": false,
  "errors": []  // Optional, for validation errors
}
```

Common status codes:
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## 🔒 Security Features

### 1. Password Security
- **bcrypt hashing**: Passwords hashed with salt rounds (10)
- **No plain text**: Passwords never stored or transmitted in plain text
- **Select exclusion**: Password field excluded from query results by default

### 2. Token Security
- **Short-lived access tokens**: 15 minutes prevents long-term hijacking
- **HTTP-only cookies**: Refresh tokens inaccessible to JavaScript (XSS protection)
- **Token rotation**: New refresh token issued on each refresh
- **Signature verification**: All tokens verified before processing

### 3. CORS Configuration
```javascript
{
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
  }
}
```

### 4. Input Validation
- **Required fields**: Enforced at Mongoose schema level
- **Email validation**: Regex pattern matching
- **File type validation**: Only allow image formats
- **File size limits**: 5MB max to prevent DOS attacks

### 5. Authentication Middleware
- **verifyJWT**: Required authentication, throws 401 if missing token
- **optionalAuth**: Allows anonymous access with limited features
- **Token verification**: Validates signature and expiry on every request

---

## 🎨 UI Components

### Authentication Components
- **AuthForm**: Dual-purpose login/register form with Google OAuth button
- **LoginPage**: Full-page authentication with form switching

### Comment Components
- **CommentThread**: Recursive component for nested comment display with indentation
- **Comment**: Individual comment card with avatar, text, upvotes, and reply button
- **CommentForm**: Create new top-level comments with character counter
- **ReplyInput**: Inline reply form that appears when replying to a comment
- **UpvoteButton**: Interactive button with filled/outlined states and vote count

### Common Components
- **UserAvatar**: Displays user profile picture or color-coded initials
- **LoadingSpinner**: Material-UI CircularProgress with centered layout
- **ErrorMessage**: Red error alert with close button
- **EmptyState**: Friendly message when no comments exist

### Layout Components
- **Layout**: Main app wrapper with Navbar and content area
- **Navbar**: Top navigation with user menu, avatar, and logout
- **Post**: Static post display with title, content, and metadata

---

## 📚 Key Features Explained

### 1. Nested Comments Architecture

The system supports unlimited comment nesting using a parent-child relationship:

**Database Structure:**
```javascript
// Top-level comment
{ _id: "comment1", text: "Great article!", parentId: null }

// Reply to comment1
{ _id: "comment2", text: "I agree!", parentId: "comment1" }

// Reply to comment2 (nested 2 levels)
{ _id: "comment3", text: "Me too!", parentId: "comment2" }
```

**How it works:**
1. Backend fetches all comments for a post
2. Recursive `fetchReplies()` function builds the tree structure
3. Frontend displays with visual indentation (8px per level)
4. Each comment can have unlimited replies

### 2. Upvote System with Toggle

**Single User, Single Vote:**
- Each comment has `upvotedBy` array storing user ObjectIds
- Before upvoting, check if user ID exists in array
- If present: Remove user ID (downvote), decrement count
- If absent: Add user ID (upvote), increment count

**Optimistic UI Updates:**
```javascript
// 1. Immediately update local state
setComments(prev => updateUpvoteCount(prev, commentId, +1));

// 2. Send API request
const response = await api.upvote(commentId);

// 3. Server confirms or rejects
if (response.success) {
  // Keep optimistic update
} else {
  // Rollback to previous state
  setComments(previousState);
}
```

### 3. JWT Authentication Flow

```
Login → Server generates tokens
         ↓
   Access Token (15min) → localStorage
   Refresh Token (7days) → HTTP-only cookie
         ↓
Every API request includes: Authorization: Bearer <access_token>
         ↓
Token expires after 15 min → 401 error
         ↓
Axios interceptor catches 401
         ↓
Automatically calls /refresh-token endpoint
         ↓
Server validates refresh token → Issues new access token
         ↓
Retry original request with new token
         ↓
If refresh token expired → Redirect to login
```

### 4. Google OAuth Integration

**Frontend Flow:**
1. User clicks "Continue with Google"
2. Google popup opens for authentication
3. User selects Google account
4. Google returns JWT credential token
5. Frontend sends credential to backend `/google-login`
6. Backend verifies token with Google Auth Library
7. Backend finds or creates user in database
8. Backend returns access + refresh tokens
9. Frontend stores tokens and redirects to home page

**Security Benefits:**
- Backend verifies token directly with Google (can't be faked)
- No password storage required for Google users
- COOP headers configured to allow popup authentication

### 5. Image Upload Process

```
User selects avatar file
         ↓
Multer middleware intercepts:
  - Validates file type (jpg, png, jpeg)
  - Validates file size (max 5MB)
  - Generates unique filename with timestamp
         ↓
File temporarily saved to Backend/uploads/
         ↓
Cloudinary.uploader.upload():
  - Uploads file to Cloudinary CDN
  - Returns secure HTTPS URL
         ↓
URL saved to user.avatar field in MongoDB
         ↓
Local temporary file deleted from Backend/uploads/
         ↓
Frontend displays avatar from Cloudinary URL
         ↓
Fast, global CDN delivery
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot connect to MongoDB"

**Symptoms:**
```
MongooseServerSelectionError: Could not connect to any servers
```

**Solutions:**
- ✅ Verify MongoDB URI in `.env` is correct
- ✅ Check password doesn't contain special characters (use URL encoding)
- ✅ Whitelist your IP in MongoDB Atlas Network Access (or use 0.0.0.0/0)
- ✅ Ensure database user has correct permissions
- ✅ Check if free tier cluster is paused (auto-pauses after inactivity)

#### 2. "Google OAuth COOP Policy Error"

**Symptoms:**
```
Cross-Origin-Opener-Policy policy would block the window.postMessage call
```

**Solutions:**
- ✅ Verify COOP headers in backend `app.js`
- ✅ Restart backend server after adding headers
- ✅ Clear browser cache and try incognito mode
- ✅ Check authorized origins in Google Cloud Console

#### 3. "Cloudinary Upload Failed"

**Symptoms:**
```
Error: Must supply api_key
```

**Solutions:**
- ✅ Verify all three Cloudinary variables in `.env`
- ✅ Remove spaces around `=` in `.env` file
- ✅ Restart backend server after changing `.env`
- ✅ Confirm credentials match Cloudinary dashboard

#### 4. "CORS Error: No 'Access-Control-Allow-Origin'"

**Symptoms:**
```
Access to fetch blocked by CORS policy
```

**Solutions:**
- ✅ Add frontend URL to CORS origins in backend `app.js`
- ✅ Restart backend server
- ✅ Verify `credentials: true` in CORS config
- ✅ Check axios includes `withCredentials: true`

#### 5. "Token Expired" or "Invalid Token"

**Symptoms:**
```
401 Unauthorized: jwt expired / invalid signature
```

**Solutions:**
- ✅ Access token expires after 15 min (normal behavior)
- ✅ Refresh should happen automatically (check axios interceptor)
- ✅ Clear localStorage and login again
- ✅ Verify JWT secrets match between requests

#### 6. "Port 3000 Already in Use"

**Symptoms:**
```
Error: listen EADDRINUSE :::3000
```

**Solutions:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change backend PORT in .env to 3001
# Then update REACT_APP_API_URL in frontend .env
```

---

## 📝 Environment Variables Reference

### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port number |
| `MONGODB_URI` | **Yes** | - | MongoDB Atlas connection string |
| `ACCESS_TOKEN_SECRET` | **Yes** | - | JWT access token secret (64+ chars recommended) |
| `REFRESH_TOKEN_SECRET` | **Yes** | - | JWT refresh token secret (64+ chars recommended) |
| `ACCESS_TOKEN_EXPIRY` | No | 15m | Access token lifespan (e.g., 15m, 1h) |
| `REFRESH_TOKEN_EXPIRY` | No | 7d | Refresh token lifespan (e.g., 7d, 30d) |
| `GOOGLE_CLIENT_ID` | **Yes** | - | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | **Yes** | - | Google OAuth 2.0 client secret |
| `CLOUDINARY_CLOUD_NAME` | **Yes** | - | Cloudinary cloud name from dashboard |
| `CLOUDINARY_API_KEY` | **Yes** | - | Cloudinary API key from dashboard |
| `CLOUDINARY_API_SECRET` | **Yes** | - | Cloudinary API secret from dashboard |

**Generate JWT Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | **Yes** | - | Backend API base URL (e.g., http://localhost:3000) |
| `REACT_APP_GOOGLE_CLIENT_ID` | **Yes** | - | Google OAuth client ID (same as backend) |

---

## 🧪 Testing the Application

### Manual Testing Checklist

#### Authentication Tests
- [ ] Register new user with username, email, password
- [ ] Register with avatar image upload
- [ ] Login with valid credentials
- [ ] Login with Google OAuth
- [ ] Logout successfully
- [ ] Access token auto-refreshes after 15 minutes
- [ ] Protected routes redirect to login when not authenticated
- [ ] User state persists after page refresh

#### Comment Tests
- [ ] View comments without being logged in (anonymous mode)
- [ ] Create new top-level comment
- [ ] Reply to existing comment
- [ ] Reply to a reply (nested 2+ levels)
- [ ] Comment text displays with proper formatting
- [ ] User avatars display correctly with comments
- [ ] Timestamps show relative time (e.g., "2 hours ago")

#### Upvote Tests
- [ ] Upvote button shows count correctly
- [ ] Click upvote - count increases, button fills
- [ ] Click again (toggle) - count decreases, button unfills
- [ ] Upvote state persists after page refresh
- [ ] Can't upvote without logging in (button disabled)
- [ ] isUpvoted status shows correctly for logged-in user

#### UI/UX Tests
- [ ] Loading spinner displays while fetching data
- [ ] Error messages show user-friendly text
- [ ] Empty state displays when no comments exist
- [ ] Navbar shows user avatar and username
- [ ] Logout confirmation works correctly
- [ ] Responsive design works on mobile devices
- [ ] Smooth animations and transitions

#### Edge Cases
- [ ] Very long comment text wraps properly
- [ ] Special characters render correctly (emoji, symbols)
- [ ] Rapid clicking upvote doesn't create duplicate votes
- [ ] Large avatar images resize correctly
- [ ] Multiple simultaneous users don't conflict
- [ ] Network errors display proper error messages

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for Inter IIT Tech Meet.

## 🐛 Known Issues

- Ensure MongoDB connection string is properly configured
- Google OAuth requires proper redirect URIs in Google Console
- Cloudinary credentials must be valid for image uploads

## 📧 Contact

For any queries or issues, please open an issue in the repository.
