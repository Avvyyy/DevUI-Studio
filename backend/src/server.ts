import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { serverConfig } from './config/watsonx.config';
import aiRoutes from './routes/ai.routes';
import { watsonxService } from './services/watsonx.service';
import { corsMiddleware } from './middleware/cors.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(loggerMiddleware);

// Routes
app.use('/api/ai', aiRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({
        name: 'DevUI Studio API',
        version: '1.0.0',
        status: 'running',
        watsonxInitialized: watsonxService.isInitialized(),
    });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        watsonx: watsonxService.isInitialized() ? 'connected' : 'not configured',
    });
});

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = serverConfig.port;

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║           DevUI Studio Backend Server                ║
║                                                       ║
║   Server running on: http://localhost:${PORT}        ║
║   Environment: ${serverConfig.nodeEnv}                        ║
║   WatsonX Status: ${watsonxService.isInitialized() ? 'Connected' : 'Not Configured'}           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
    
    if (!watsonxService.isInitialized()) {
        console.warn('\n⚠️  WARNING: WatsonX AI is not configured!');
        console.warn('Please set WATSONX_API_KEY and WATSONX_PROJECT_ID in your .env file\n');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

export default app;


