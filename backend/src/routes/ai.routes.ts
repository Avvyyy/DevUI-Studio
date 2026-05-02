import { Router, Request, Response } from 'express';
import { aiController } from '../controllers/ai.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Codebase Understanding Routes
router.post('/explain-code', upload.array('files', 10), aiController.explainCode);
router.post('/suggest-feature-location', upload.array('files', 10), aiController.suggestFeatureLocation);
router.post('/answer-question', aiController.answerQuestion);

// Idea to Design Routes
router.post('/generate-design', aiController.generateDesign);

// Code Generation Routes
router.post('/generate-ui-code', aiController.generateUICode);
router.post('/generate-backend-code', aiController.generateBackendCode);

// Integration Routes
router.post('/integration-guidance', aiController.generateIntegrationGuidance);

// Improvement Suggestions
router.post('/suggest-improvements', aiController.suggestImprovements);

// Health check
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'AI service is running' });
});

export default router;


