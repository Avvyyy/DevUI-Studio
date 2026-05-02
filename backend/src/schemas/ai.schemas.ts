import { z } from 'zod';

// Validation schemas for AI endpoints

export const explainCodeSchema = z.object({
    question: z.string().optional(),
});

export const suggestFeatureLocationSchema = z.object({
    featureDescription: z.string().min(10),
});

export const answerQuestionSchema = z.object({
    question: z.string().min(5),
    context: z.string().optional(),
});

export const generateDesignSchema = z.object({
    description: z.string().min(10),
    context: z.string().optional(),
});

export const generateUICodeSchema = z.object({
    description: z.string().min(10),
    framework: z.enum(['react', 'vue']),
    styling: z.enum(['tailwind', 'css']),
});

export const generateBackendCodeSchema = z.object({
    description: z.string().min(10),
    language: z.string().default('typescript'),
});

export const integrationGuidanceSchema = z.object({
    frontendFramework: z.string(),
    backendFramework: z.string(),
    featureDescription: z.string().min(10),
});

export const suggestImprovementsSchema = z.object({
    code: z.string().min(10),
    context: z.string(),
});

// Type exports
export type ExplainCodeInput = z.infer<typeof explainCodeSchema>;
export type SuggestFeatureLocationInput = z.infer<typeof suggestFeatureLocationSchema>;
export type AnswerQuestionInput = z.infer<typeof answerQuestionSchema>;
export type GenerateDesignInput = z.infer<typeof generateDesignSchema>;
export type GenerateUICodeInput = z.infer<typeof generateUICodeSchema>;
export type GenerateBackendCodeInput = z.infer<typeof generateBackendCodeSchema>;
export type IntegrationGuidanceInput = z.infer<typeof integrationGuidanceSchema>;
export type SuggestImprovementsInput = z.infer<typeof suggestImprovementsSchema>;


