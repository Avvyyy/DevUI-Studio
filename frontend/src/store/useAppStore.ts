import { create } from 'zustand';
import { ViewMode, CodeFile, AppState } from '../types';

interface AppStore extends AppState {
    // Actions
    setViewMode: (mode: ViewMode) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setUploadedFiles: (files: CodeFile[]) => void;
    addUploadedFile: (file: CodeFile) => void;
    removeUploadedFile: (fileName: string) => void;
    clearUploadedFiles: () => void;
    setExplanation: (explanation: string | null) => void;
    setDesign: (design: string | null) => void;
    setGeneratedCode: (code: string | null) => void;
    setIntegrationGuidance: (guidance: string | null) => void;
    reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
    // Initial state
    viewMode: 'codebase',
    isLoading: false,
    error: null,
    uploadedFiles: [],
    explanation: null,
    design: null,
    generatedCode: null,
    integrationGuidance: null,
    
    // Actions
    setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setError: (error: string | null) => set({ error }),
    
    setUploadedFiles: (files: CodeFile[]) => set({ uploadedFiles: files }),
    addUploadedFile: (file: CodeFile) => set((state: AppStore) => ({
        uploadedFiles: [...state.uploadedFiles, file]
    })),
    removeUploadedFile: (fileName: string) => set((state: AppStore) => ({
        uploadedFiles: state.uploadedFiles.filter((f: CodeFile) => f.name !== fileName)
    })),
    clearUploadedFiles: () => set({ uploadedFiles: [] }),
    
    setExplanation: (explanation: string | null) => set({ explanation }),
    setDesign: (design: string | null) => set({ design }),
    setGeneratedCode: (code: string | null) => set({ generatedCode: code }),
    setIntegrationGuidance: (guidance: string | null) => set({ integrationGuidance: guidance }),
    
    reset: () => set({
        isLoading: false,
        error: null,
        uploadedFiles: [],
        explanation: null,
        design: null,
        generatedCode: null,
        integrationGuidance: null,
    }),
}));


