import { Request, Response } from 'express';
import { aiPromptsService, CodebaseFile } from '../services/ai-prompts.service';
import {
    explainCodeSchema,
    suggestFeatureLocationSchema,
    answerQuestionSchema,
    generateDesignSchema,
    generateUICodeSchema,
    generateBackendCodeSchema,
    integrationGuidanceSchema,
    suggestImprovementsSchema,
} from '../schemas/ai.schemas';

class AIController {
    /**
     * Explain uploaded codebase files
     */
    async explainCode(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            
            if (!files || files.length === 0) {
                res.status(400).json({ error: 'No files uploaded' });
                return;
            }

            const validation = explainCodeSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { question } = validation.data;

            // Convert uploaded files to CodebaseFile format
            const codebaseFiles: CodebaseFile[] = files.map(file => ({
                path: file.originalname,
                content: file.buffer.toString('utf-8'),
            }));

            const explanation = await aiPromptsService.explainCode(codebaseFiles, question);

            res.json({
                success: true,
                explanation,
                filesAnalyzed: files.length,
            });
        } catch (error: any) {
            console.error('Error in explainCode:', error);
            res.status(500).json({ error: error.message || 'Failed to explain code' });
        }
    }

    /**
     * Suggest where to add a new feature in existing codebase
     */
    async suggestFeatureLocation(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            
            if (!files || files.length === 0) {
                res.status(400).json({ error: 'No files uploaded' });
                return;
            }

            const validation = suggestFeatureLocationSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { featureDescription } = validation.data;

            const codebaseFiles: CodebaseFile[] = files.map(file => ({
                path: file.originalname,
                content: file.buffer.toString('utf-8'),
            }));

            const suggestions = await aiPromptsService.suggestFeatureLocation(
                codebaseFiles,
                featureDescription
            );

            res.json({
                success: true,
                suggestions,
                filesAnalyzed: files.length,
            });
        } catch (error: any) {
            console.error('Error in suggestFeatureLocation:', error);
            res.status(500).json({ error: error.message || 'Failed to suggest feature location' });
        }
    }

    /**
     * Answer a specific question about code or architecture
     */
    async answerQuestion(req: Request, res: Response): Promise<void> {
        try {
            const validation = answerQuestionSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { question, context } = validation.data;

            const answer = await aiPromptsService.answerQuestion(question, context);

            res.json({
                success: true,
                answer,
            });
        } catch (error: any) {
            console.error('Error in answerQuestion:', error);
            res.status(500).json({ error: error.message || 'Failed to answer question' });
        }
    }

    /**
     * Generate UI structure and system design from feature idea
     */
    async generateDesign(req: Request, res: Response): Promise<void> {
        try {
            const validation = generateDesignSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { description, context } = validation.data;

            const design = await aiPromptsService.generateUIAndSystemDesign({
                description,
                context,
            });

            res.json({
                success: true,
                design,
            });
        } catch (error: any) {
            console.error('Error in generateDesign:', error);
            res.status(500).json({ error: error.message || 'Failed to generate design' });
        }
    }

    /**
     * Generate UI component code
     */
    async generateUICode(req: Request, res: Response): Promise<void> {
        try {
            const validation = generateUICodeSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const code = await aiPromptsService.generateUICode(validation.data);

            res.json({
                success: true,
                code,
                framework: validation.data.framework,
                styling: validation.data.styling,
            });
        } catch (error: any) {
            console.error('Error in generateUICode:', error);
            res.status(500).json({ error: error.message || 'Failed to generate UI code' });
        }
    }

    /**
     * Generate backend API code
     */
    async generateBackendCode(req: Request, res: Response): Promise<void> {
        try {
            const validation = generateBackendCodeSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { description, language } = validation.data;

            const code = await aiPromptsService.generateBackendCode(description, language);

            res.json({
                success: true,
                code,
                language,
            });
        } catch (error: any) {
            console.error('Error in generateBackendCode:', error);
            res.status(500).json({ error: error.message || 'Failed to generate backend code' });
        }
    }

    /**
     * Generate integration guidance
     */
    async generateIntegrationGuidance(req: Request, res: Response): Promise<void> {
        try {
            const validation = integrationGuidanceSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { frontendFramework, backendFramework, featureDescription } = validation.data;

            const guidance = await aiPromptsService.generateIntegrationGuidance(
                frontendFramework,
                backendFramework,
                featureDescription
            );

            res.json({
                success: true,
                guidance,
            });
        } catch (error: any) {
            console.error('Error in generateIntegrationGuidance:', error);
            res.status(500).json({ error: error.message || 'Failed to generate integration guidance' });
        }
    }

    /**
     * Suggest improvements for code
     */
    async suggestImprovements(req: Request, res: Response): Promise<void> {
        try {
            const validation = suggestImprovementsSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: validation.error.errors });
                return;
            }

            const { code, context } = validation.data;

            const suggestions = await aiPromptsService.suggestImprovements(code, context);

            res.json({
                success: true,
                suggestions,
            });
        } catch (error: any) {
            console.error('Error in suggestImprovements:', error);
            res.status(500).json({ error: error.message || 'Failed to suggest improvements' });
        }
    }
}

export const aiController = new AIController();


