export type ViewMode = 'codebase' | 'design' | 'generate' | 'integrate';

export interface CodeFile {
    name: string;
    content: string;
    file: File;
}

export interface AppState {
    // UI State
    viewMode: ViewMode;
    isLoading: boolean;
    error: string | null;
    
    // Files
    uploadedFiles: CodeFile[];
    
    // Results
    explanation: string | null;
    design: string | null;
    generatedCode: string | null;
    integrationGuidance: string | null;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface ExplainCodeResponse {
    success: boolean;
    explanation: string;
    filesAnalyzed: number;
}

export interface GenerateDesignResponse {
    success: boolean;
    design: string;
}

export interface GenerateCodeResponse {
    success: boolean;
    code: string;
    framework: 'react' | 'vue';
    styling: 'tailwind' | 'css';
}

export interface IntegrationGuidanceResponse {
    success: boolean;
    guidance: string;
}


