import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { apiService } from '../../services/api.service';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { GitMerge } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function IntegrateView() {
  const { integrationGuidance, setIntegrationGuidance, isLoading, setLoading, setError } = useAppStore();

  const [frontendFramework, setFrontendFramework] = useState('react');
  const [backendFramework, setBackendFramework] = useState('express');
  const [featureDescription, setFeatureDescription] = useState('');

  const handleGenerateGuidance = async () => {
    if (!featureDescription.trim()) {
      setError('Please provide a feature description');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.generateIntegrationGuidance(
        frontendFramework,
        backendFramework,
        featureDescription
      );
      setIntegrationGuidance(response.guidance);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate integration guidance';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Integration Guidance"
        description="Get step-by-step guidance for integrating frontend and backend components"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">
                Frontend Framework
              </label>
              <select
                value={frontendFramework}
                onChange={(e) => setFrontendFramework(e.target.value)}
                className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="angular">Angular</option>
                <option value="svelte">Svelte</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">
                Backend Framework
              </label>
              <select
                value={backendFramework}
                onChange={(e) => setBackendFramework(e.target.value)}
                className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="express">Express.js</option>
                <option value="fastapi">FastAPI</option>
                <option value="django">Django</option>
                <option value="spring">Spring Boot</option>
                <option value="nestjs">NestJS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Feature Description *
            </label>
            <textarea
              value={featureDescription}
              onChange={(e) => setFeatureDescription(e.target.value)}
              placeholder="Describe the feature you want to integrate (e.g., 'User authentication with JWT tokens')"
              className="w-full px-4 py-3 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
              rows={4}
            />
          </div>

          <Button
            onClick={handleGenerateGuidance}
            isLoading={isLoading}
            disabled={!featureDescription.trim()}
            icon={<GitMerge className="w-4 h-4" />}
            className="w-full"
          >
            Generate Integration Guide
          </Button>
        </div>
      </Card>

      {isLoading && (
        <Card>
          <LoadingSpinner size="lg" message="Generating integration guidance..." />
        </Card>
      )}

      {integrationGuidance && !isLoading && (
        <Card title="Integration Guide">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{integrationGuidance}</ReactMarkdown>
          </div>
        </Card>
      )}

      {integrationGuidance && !isLoading && (
        <Card title="Common Integration Patterns">
          <div className="space-y-4">
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <h4 className="font-medium text-dark-primary mb-2">REST API Integration</h4>
              <p className="text-sm text-dark-secondary">
                Use fetch or axios to make HTTP requests from your frontend to backend endpoints.
              </p>
            </div>
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <h4 className="font-medium text-dark-primary mb-2">WebSocket Communication</h4>
              <p className="text-sm text-dark-secondary">
                Implement real-time bidirectional communication for live updates and notifications.
              </p>
            </div>
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <h4 className="font-medium text-dark-primary mb-2">State Management</h4>
              <p className="text-sm text-dark-secondary">
                Use Redux, Zustand, or Context API to manage application state and API responses.
              </p>
            </div>
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <h4 className="font-medium text-dark-primary mb-2">Error Handling</h4>
              <p className="text-sm text-dark-secondary">
                Implement proper error handling with try-catch blocks and user-friendly error messages.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

