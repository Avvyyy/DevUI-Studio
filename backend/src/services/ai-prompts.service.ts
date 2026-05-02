import { watsonxService } from './watsonx.service';

export interface CodebaseFile {
    path: string;
    content: string;
}

export interface FeatureIdea {
    description: string;
    context?: string;
}

export interface UIGenerationRequest {
    description: string;
    framework: 'react' | 'vue';
    styling: 'tailwind' | 'css';
}

class AIPromptsService {
    /**
     * Explain codebase structure and suggest where to add features
     */
    async explainCode(files: CodebaseFile[], question?: string): Promise<string> {
        const filesContext = files.map(f => `
File: ${f.path}
\`\`\`
${f.content}
\`\`\`
`).join('\n\n');

        const prompt = `You are an expert software engineer analyzing a codebase. 

${filesContext}

Please provide a clear explanation of:
1. What each main folder/file does
2. Where the core logic is located
3. The overall architecture and data flow
${question ? `\n4. Answer this specific question: ${question}` : ''}

Provide your response in a clear, structured format that helps developers understand the codebase quickly.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 2000,
            temperature: 0.5,
        });
    }

    /**
     * Suggest where to add a new feature in existing codebase
     */
    async suggestFeatureLocation(files: CodebaseFile[], featureDescription: string): Promise<string> {
        const filesContext = files.map(f => `
File: ${f.path}
\`\`\`
${f.content}
\`\`\`
`).join('\n\n');

        const prompt = `You are an expert software engineer helping to integrate a new feature into an existing codebase.

Existing Codebase:
${filesContext}

New Feature to Add:
${featureDescription}

Please suggest:
1. Which existing files should be modified
2. What new files should be created and where
3. Step-by-step implementation guidance
4. How the new feature connects to existing code

Provide specific, actionable recommendations.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 2500,
            temperature: 0.6,
        });
    }

    /**
     * Generate UI structure and system design from feature idea
     */
    async generateUIAndSystemDesign(idea: FeatureIdea): Promise<string> {
        const prompt = `You are an expert UI/UX designer and system architect.

Feature Idea:
${idea.description}

${idea.context ? `Additional Context:\n${idea.context}` : ''}

Please generate:

1. UI STRUCTURE:
   - List of components needed
   - Component hierarchy
   - Layout structure
   - Key UI elements and their purpose

2. SYSTEM DESIGN:
   - Data models/entities needed
   - API endpoints required
   - Data flow between frontend and backend
   - State management approach

3. IMPLEMENTATION NOTES:
   - Key considerations
   - Potential challenges
   - Best practices to follow

Format your response in clear sections with markdown formatting.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 3000,
            temperature: 0.7,
        });
    }

    /**
     * Generate UI component code
     */
    async generateUICode(request: UIGenerationRequest): Promise<string> {
        const frameworkDetails = request.framework === 'react'
            ? 'React with TypeScript and functional components using hooks'
            : 'Vue 3 with Composition API and TypeScript';

        const stylingDetails = request.styling === 'tailwind'
            ? 'Tailwind CSS utility classes'
            : 'CSS modules';

        const prompt = `You are an expert frontend developer. Generate production-ready UI code.

Requirements:
- Framework: ${frameworkDetails}
- Styling: ${stylingDetails}
- Feature: ${request.description}

Generate:
1. Component structure with proper TypeScript types
2. Clean, reusable code
3. Proper accessibility attributes
4. Responsive design
5. Comments explaining key parts

Provide complete, working code that can be directly used in a project.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 3500,
            temperature: 0.6,
        });
    }

    /**
     * Generate backend API code
     */
    async generateBackendCode(description: string, language: string = 'typescript'): Promise<string> {
        const prompt = `You are an expert backend developer. Generate production-ready API code.

Language/Framework: ${language === 'typescript' ? 'Node.js with Express and TypeScript' : language}
Feature: ${description}

Generate:
1. API routes/endpoints
2. Controller logic
3. Service layer (business logic)
4. Data models/schemas
5. Error handling
6. Input validation

Provide complete, working code with proper structure and best practices.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 3500,
            temperature: 0.6,
        });
    }

    /**
     * Provide integration guidance for connecting frontend and backend
     */
    async generateIntegrationGuidance(
        frontendFramework: string,
        backendFramework: string,
        featureDescription: string
    ): Promise<string> {
        const prompt = `You are an expert full-stack developer. Provide integration guidance.

Frontend: ${frontendFramework}
Backend: ${backendFramework}
Feature: ${featureDescription}

Provide:
1. How to structure API calls from frontend
2. State management approach
3. Error handling strategy
4. Authentication/authorization if needed
5. Data flow diagram (in text)
6. Code examples for key integration points

Make it practical and actionable.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 2500,
            temperature: 0.6,
        });
    }

    /**
     * Suggest improvements for existing code or design
     */
    async suggestImprovements(code: string, context: string): Promise<string> {
        const prompt = `You are an expert code reviewer. Analyze this code and suggest improvements.

Context: ${context}

Code:
\`\`\`
${code}
\`\`\`

Suggest improvements for:
1. Code structure and organization
2. Performance optimizations
3. Accessibility enhancements
4. UX improvements
5. Security considerations
6. Best practices

Provide specific, actionable suggestions with examples.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 2000,
            temperature: 0.6,
        });
    }

    /**
     * Answer specific questions about code or architecture
     */
    async answerQuestion(question: string, context?: string): Promise<string> {
        const prompt = `You are an expert software engineer. Answer this question clearly and concisely.

${context ? `Context:\n${context}\n\n` : ''}Question: ${question}

Provide a clear, practical answer with examples if helpful.`;

        return await watsonxService.generateText(prompt, {
            max_new_tokens: 1500,
            temperature: 0.5,
        });
    }
}

export const aiPromptsService = new AIPromptsService();


