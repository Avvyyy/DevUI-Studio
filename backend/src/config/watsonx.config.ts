import dotenv from 'dotenv';

dotenv.config();

export const watsonxConfig = {
  apiKey: process.env.WATSONX_API_KEY || '',
  projectId: process.env.WATSONX_PROJECT_ID || '',
  url: process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com',
  version: '2023-05-29',
  modelId: 'meta-llama/llama-3-70b-instruct', // Default model
  parameters: {
    max_new_tokens: 2000,
    temperature: 0.7,
    top_p: 0.9,
    top_k: 50,
  }
};

export const serverConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
};


