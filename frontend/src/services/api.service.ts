import axios, { AxiosInstance, AxiosError } from 'axios';
import {
    ExplainCodeResponse,
    GenerateDesignResponse,
    GenerateCodeResponse,
    IntegrationGuidanceResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 60000, // 60 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                console.error('API Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    // Codebase Understanding
    async explainCode(files: File[], question?: string): Promise<ExplainCodeResponse> {
        const formData = new FormData();
        files.forEach((file: File) => formData.append('files', file));
        if (question) formData.append('question', question);

        const response = await this.client.post<ExplainCodeResponse>('/ai/explain-code', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    async suggestFeatureLocation(files: File[], featureDescription: string): Promise<{ success: boolean; suggestion: string }> {
        const formData = new FormData();
        files.forEach((file: File) => formData.append('files', file));
        formData.append('featureDescription', featureDescription);

        const response = await this.client.post<{ success: boolean; suggestion: string }>('/ai/suggest-feature-location', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    async answerQuestion(question: string, context?: string): Promise<{ success: boolean; answer: string }> {
        const response = await this.client.post<{ success: boolean; answer: string }>('/ai/answer-question', {
            question,
            context,
        });
        return response.data;
    }

    // Design Generation
    async generateDesign(description: string, context?: string): Promise<GenerateDesignResponse> {
        const response = await this.client.post<GenerateDesignResponse>('/ai/generate-design', {
            description,
            context,
        });
        return response.data;
    }

    // Code Generation
    async generateUICode(
        description: string,
        framework: 'react' | 'vue',
        styling: 'tailwind' | 'css'
    ): Promise<GenerateCodeResponse> {
        const response = await this.client.post<GenerateCodeResponse>('/ai/generate-ui-code', {
            description,
            framework,
            styling,
        });
        return response.data;
    }

    async generateBackendCode(description: string, language: string = 'typescript'): Promise<GenerateCodeResponse> {
        const response = await this.client.post<GenerateCodeResponse>('/ai/generate-backend-code', {
            description,
            language,
        });
        return response.data;
    }

    // Integration
    async generateIntegrationGuidance(
        frontendFramework: string,
        backendFramework: string,
        featureDescription: string
    ): Promise<IntegrationGuidanceResponse> {
        const response = await this.client.post<IntegrationGuidanceResponse>('/ai/integration-guidance', {
            frontendFramework,
            backendFramework,
            featureDescription,
        });
        return response.data;
    }

    // Improvements
    async suggestImprovements(code: string, context: string): Promise<{ success: boolean; improvements: string }> {
        const response = await this.client.post<{ success: boolean; improvements: string }>('/ai/suggest-improvements', {
            code,
            context,
        });
        return response.data;
    }

    // Health check
    async healthCheck(): Promise<{ status: string; message: string }> {
        const response = await this.client.get<{ status: string; message: string }>('/ai/health');
        return response.data;
    }
}

export const apiService = new ApiService();


