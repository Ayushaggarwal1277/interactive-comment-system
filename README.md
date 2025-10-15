# Interactive Comment System

A full-stack web application featuring a modern, nested comment system with authentication, Google OAuth, avatar uploads, and real-time upvoting functionality.

## 🚀 Features

- **User Authentication**
  - JWT-based authentication (access & refresh tokens)
  - Google OAuth 2.0 integration
  - Secure password hashing with bcrypt

- **Comment System**
  - Unlimited nested comment replies
  - Real-time upvote/downvote with toggle functionality
  - Single upvote per user per comment
  - Anonymous viewing with optional authentication

- **User Profiles**
  - Avatar upload with Cloudinary integration
  - Profile management

- **Modern UI**
  - Material-UI components
  - Responsive design
  - Loading states and error handling
  - Optimistic UI updates

## 🛠️ Tech Stack

### Backend
- Node.js with Express 5.1.0
- MongoDB with Mongoose 8.19.1
- JWT authentication
- Google Auth Library
- Multer + Cloudinary for file uploads
- CORS with security headers

### Frontend
- React 18.2.0
- Material-UI 5.14.16
- React Router 6.20.0
- Axios 1.6.2
- React Context API for state management
- @react-oauth/google for OAuth integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for image uploads
- Google OAuth credentials

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd INTER_IIT_TM
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🚀 Running the Application

### Start Backend
```bash
cd Backend
node index.js
```
Backend will run on `http://localhost:3000`

### Start Frontend
```bash
cd Frontend
npm start
```
Frontend will run on `http://localhost:3000` (or next available port)

## 📁 Project Structure

```
INTER_IIT_TM/
├── Backend/
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Auth, file upload middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── uploads/         # Temporary file storage
│   ├── app.js          # Express app configuration
│   └── index.js        # Server entry point
├── Frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # Context providers
│       ├── pages/       # Page components
│       └── services/    # API services
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/google-login` - Google OAuth login
- `POST /api/users/logout` - Logout user
- `POST /api/users/refresh-token` - Refresh access token
- `GET /api/users/current-user` - Get current user info

### Comments
- `GET /api/comments/:postId` - Get all comments for a post
- `POST /api/comments` - Create new comment
- `POST /api/comments/:commentId/reply` - Reply to a comment
- `POST /api/comments/:commentId/upvote` - Toggle upvote on comment

## 🔒 Security Features

- JWT token-based authentication
- HTTP-only cookies for refresh tokens
- CORS configuration with multiple origins
- COOP headers for OAuth compatibility
- Secure password hashing
- File upload validation
- Optional authentication for public routes

## 🎨 UI Components

- **AuthForm** - Login/Register form with Google OAuth
- **CommentThread** - Nested comment display
- **CommentForm** - Comment creation interface
- **UpvoteButton** - Interactive upvote functionality
- **UserAvatar** - User profile pictures
- **Navbar** - Navigation with auth controls

## 📝 Environment Variables Reference

### Backend Required Variables
- `MONGODB_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - Secret for access tokens
- `REFRESH_TOKEN_SECRET` - Secret for refresh tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend Required Variables
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth client ID

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
