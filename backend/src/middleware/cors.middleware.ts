import cors from 'cors';
import { serverConfig } from '../config/watsonx.config';

export const corsMiddleware = cors({
    origin: serverConfig.allowedOrigins,
    credentials: true,
});


