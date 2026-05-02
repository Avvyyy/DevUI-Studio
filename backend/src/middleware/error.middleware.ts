import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config/watsonx.config';

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(serverConfig.nodeEnv === 'development' && { stack: err.stack }),
    });
};


