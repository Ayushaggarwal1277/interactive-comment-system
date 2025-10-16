import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import commentRouter from "./routes/comment.routes.js";

dotenv.config();

const app = express();

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://interactive-comment-system-352o.vercel.app',
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel deployments
    if (origin && origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie']
};

// Middlewares
app.use(cors(corsOptions));

// Additional security headers for OAuth
app.use((req, res, next) => {
  // Allow cross-origin access for OAuth popups
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});


app.use(express.json());
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Interactive Comment System API - Backend is running!',
    version: '1.0.0',
    mongodb: 'Connected',
    endpoints: {
      users: '/api/users',
      comments: '/api/comments',
      health: '/health'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);


export default app;
