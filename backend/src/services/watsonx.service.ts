import axios, { AxiosInstance } from 'axios';
import { watsonxConfig } from '../config/watsonx.config';

// Using axios for WatsonX REST API calls
class WatsonXService {
  private initialized: boolean = false;
  private apiKey: string;
  private projectId: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.apiKey = watsonxConfig.apiKey;
    this.projectId = watsonxConfig.projectId;
    
    this.axiosInstance = axios.create({
      baseURL: watsonxConfig.url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 60000, // 60 seconds timeout
    });
    
    this.initialized = !!(this.apiKey && this.projectId);
    
    if (!this.initialized) {
      console.warn('WatsonX API key or project ID not configured');
    }
  }

  async generateText(prompt: string, customParams?: any): Promise<string> {
    if (!this.initialized) {
      throw new Error('WatsonX service not initialized. Please check your API credentials.');
    }

    try {
      const response = await this.axiosInstance.post('/ml/v1/text/generation?version=2023-05-29', {
        model_id: watsonxConfig.modelId,
        input: prompt,
        parameters: {
          ...watsonxConfig.parameters,
          ...customParams,
        },
        project_id: this.projectId,
      });

      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].generated_text;
      }
      
      throw new Error('No response generated from WatsonX');
    } catch (error: any) {
      console.error('WatsonX generation error:', error.response?.data || error.message);
      throw new Error(`Failed to generate text: ${error.response?.data?.message || error.message}`);
    }
  }

  async streamText(prompt: string, onChunk: (chunk: string) => void, customParams?: any): Promise<void> {
    if (!this.initialized) {
      throw new Error('WatsonX service not initialized. Please check your API credentials.');
    }

    try {
      // For now, use non-streaming approach
      // Streaming can be implemented later with proper SSE support
      const result = await this.generateText(prompt, customParams);
      onChunk(result);
    } catch (error: any) {
      console.error('WatsonX streaming error:', error);
      throw new Error(`Failed to stream text: ${error.message}`);
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const watsonxService = new WatsonXService();


