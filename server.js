import dotenv from 'dotenv';
// Load environment variables FIRST
dotenv.config();

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const BASE_PORT = 3000;
const instanceId = process.env.NODE_APP_INSTANCE || 0;
const PORT = BASE_PORT + parseInt(instanceId);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://avatars.githubusercontent.com", "https://raw.githubusercontent.com"],
      connectSrc: ["'self'", "https://api.github.com", "https://raw.githubusercontent.com"]
    }
  }
}));
app.use(cors());

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Enable gzip compression
app.use(compression());

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import API routes
import chatbotRoutes from './src/api/chatbot.js';
import ragRoutes from './src/api/rag.js';
import githubRoutes from './src/api/github.js';

// API routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/github', githubRoutes);

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server instance ${instanceId} running on port ${PORT}`);
});