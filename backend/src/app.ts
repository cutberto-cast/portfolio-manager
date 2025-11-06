import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import projectRoutes from './routes/projects'; // ← NUEVA IMPORTACIÓN

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Test database connection on startup
testConnection().catch(console.error);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - NUEVA SECCIÓN
app.use('/api/projects', projectRoutes);

// Health check route
app.get('/health', async (req: Request, res: Response) => {
  try {
    await testConnection();
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: 'Connected via Prisma'
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: 'Disconnected'
    });
  }
});

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Portfolio Manager API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;