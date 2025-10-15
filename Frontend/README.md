# CommentHub - Interactive Comment Section Frontend

A modern, feature-rich React frontend for a single-post application with nested comment functionality.

## Features

### 🔐 Authentication
- Login and registration forms with validation
- Google OAuth sign-in support (placeholder - needs implementation)
- JWT token management
- User avatar and name display
- Secure session management

### 📝 Post Display
- Single post view with image support
- Post author information
- Timestamp display
- Tag support
- Responsive design

### 💬 Comments Section
- Unlimited nested reply threads
- Collapsible/expandable comment trees
- Smooth animations for expanding/collapsing
- Sort comments by:
  - Newest first
  - Most upvoted
- Real-time comment count
- Optimistic UI updates

### ⚡ Comment Actions
- Add top-level comments
- Reply to any comment (inline)
- Upvote comments with instant feedback
- Visual feedback for user interactions

### 🎨 UI/UX Features
- Fully responsive (desktop, tablet, mobile)
- Material-UI design system
- Loading spinners for async operations
- Error message handling
- Empty state displays
- Visual nesting indicators
- Color-coded avatars
- Smooth transitions and animations

### 🏗️ Technical Features
- React Context API for state management
- Axios with interceptors for API calls
- JWT authentication with automatic token refresh
- Environment variable configuration
- Component-based architecture
- Reusable UI components

## Project Structure

```
Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthForm.js          # Login/Register forms
│   │   ├── comments/
│   │   │   ├── Comment.js           # Single comment with nesting
│   │   │   ├── CommentForm.js       # New comment form
│   │   │   ├── CommentThread.js     # Main comments container
│   │   │   ├── ReplyInput.js        # Inline reply input
│   │   │   └── UpvoteButton.js      # Upvote button component
│   │   ├── common/
│   │   │   ├── EmptyState.js        # Empty state display
│   │   │   ├── ErrorMessage.js      # Error message component
│   │   │   ├── LoadingSpinner.js    # Loading indicator
│   │   │   └── UserAvatar.js        # User avatar component
│   │   ├── layout/
│   │   │   ├── Layout.js            # Main layout wrapper
│   │   │   └── Navbar.js            # Navigation bar
│   │   └── post/
│   │       └── Post.js              # Post display component
│   ├── context/
│   │   ├── AuthContext.js           # Authentication context
│   │   └── CommentsContext.js       # Comments state management
│   ├── pages/
│   │   ├── HomePage.js              # Main page
│   │   └── LoginPage.js             # Login/Register page
│   ├── services/
│   │   ├── api.js                   # Axios instance with interceptors
│   │   └── apiService.js            # API method definitions
│   ├── App.js                       # Main app component
│   ├── index.js                     # Entry point
│   └── index.css                    # Global styles
├── .env                             # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 3000 (or configure in .env)

### Setup Steps

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Edit the `.env` file in the Frontend directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.
The build is minified and optimized for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## Usage Guide

### Authentication
1. Click "Login" in the navbar
2. Switch between Login/Register tabs
3. Fill in the form with validation
4. Login to access full comment functionality

### Viewing Comments
- Comments are sorted by "Newest" or "Most Upvoted"
- Click the sort dropdown to change sorting
- Nested replies are indented with visual indicators
- Click expand/collapse icons to show/hide reply threads

### Adding Comments
1. Type your comment in the text field
2. Click "Comment" to post
3. Comment appears immediately (optimistic update)

### Replying to Comments
1. Click "Reply" button on any comment
2. Reply input appears inline below the comment
3. Type your reply and click "Reply" or "Cancel"
4. Reply is nested under the parent comment

### Upvoting
1. Click the thumbs up icon on any comment
2. Upvote count updates immediately
3. Icon changes color to indicate your upvote

## API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/current` - Get current user
- `POST /api/users/google-login` - Google OAuth login

### Comments
- `GET /api/comments/:postId?sort=newest|upvotes` - Get all comments
- `POST /api/comments` - Create new comment
- `POST /api/comments/:commentId/reply` - Reply to comment
- `POST /api/comments/:commentId/upvote` - Upvote comment

## Component Documentation

### Core Components

#### `AuthForm`
Handles user authentication with form validation.
- Props: None
- Features: Tab switching, validation, Google OAuth placeholder

#### `Post`
Displays a single post with metadata.
- Props: `post` (object)
- Features: Image display, author info, timestamps, tags

#### `CommentThread`
Main container for all comments.
- Props: `postId` (string)
- Features: Sorting, loading states, empty states

#### `Comment`
Individual comment with nested replies.
- Props: `comment` (object), `depth` (number)
- Features: Collapse/expand, upvote, reply, unlimited nesting

#### `CommentForm`
Form for adding new top-level comments.
- Props: `onSubmit` (function), `disabled` (boolean)
- Features: Multi-line input, validation, disabled state

#### `ReplyInput`
Inline reply input for comments.
- Props: `onSubmit` (function), `onCancel` (function)
- Features: Auto-focus, cancel button, submit button

#### `UpvoteButton`
Upvote button with count display.
- Props: `upvotes` (number), `isUpvoted` (boolean), `onUpvote` (function)
- Features: Visual feedback, disabled state, tooltip

### Context Providers

#### `AuthContext`
Manages authentication state and operations.
- Methods: `login`, `register`, `logout`, `googleLogin`
- State: `user`, `loading`, `error`, `isAuthenticated`

#### `CommentsContext`
Manages comments state and operations.
- Methods: `fetchComments`, `addComment`, `addReply`, `upvoteComment`, `changeSortOrder`
- State: `comments`, `loading`, `error`, `sortBy`

## Responsive Design

The app is fully responsive with breakpoints:
- **Mobile**: < 600px - Single column, compact layout
- **Tablet**: 600px - 960px - Adjusted spacing
- **Desktop**: > 960px - Full layout with maximum width

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

1. **Google OAuth**: Placeholder implementation - requires `@react-oauth/google` package
2. **Edit/Delete**: Not implemented as per requirements
3. **Image Upload**: Not implemented for comments
4. **Real-time Updates**: No WebSocket support - requires manual refresh

## Future Enhancements

- Real-time comment updates with WebSockets
- Comment edit and delete functionality
- Image upload for comments
- Markdown support in comments
- User profiles and comment history
- Email notifications
- Comment reactions beyond upvotes
- Search and filter comments
- Report/flag inappropriate content

## Troubleshooting

### Issue: "Network error" when trying to login
**Solution**: Ensure the backend API is running on the correct port (default: 3000)

### Issue: Comments not loading
**Solution**: Check browser console for errors and verify API endpoints

### Issue: Upvote not working
**Solution**: Ensure you are logged in and have a valid JWT token

### Issue: "Module not found" errors
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Support

For issues and questions, please open an issue on the GitHub repository.
