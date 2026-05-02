import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { apiService } from '../../services/api.service';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Palette } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function DesignView() {
  const { design, setDesign, isLoading, setLoading, setError } = useAppStore();

  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');

  const handleGenerateDesign = async () => {
    if (!description.trim()) {
      setError('Please provide a design description');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.generateDesign(
        description,
        context || undefined
      );
      setDesign(response.design);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate design';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Design Generation"
        description="Describe your UI/UX requirements and get AI-generated design specifications"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Design Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the UI you want to create (e.g., 'A modern dashboard with charts and user statistics')"
              className="w-full px-4 py-3 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Additional Context (Optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Provide any additional context, brand guidelines, or specific requirements..."
              className="w-full px-4 py-3 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={handleGenerateDesign}
            isLoading={isLoading}
            disabled={!description.trim()}
            icon={<Palette className="w-4 h-4" />}
            className="w-full"
          >
            Generate Design
          </Button>
        </div>
      </Card>

      {isLoading && (
        <Card>
          <LoadingSpinner size="lg" message="Generating design specifications..." />
        </Card>
      )}

      {design && !isLoading && (
        <Card title="Design Specifications">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{design}</ReactMarkdown>
          </div>
        </Card>
      )}

      {design && !isLoading && (
        <Card title="Next Steps">
          <div className="space-y-3">
            <p className="text-dark-secondary">
              Ready to implement this design? Head to the Generate tab to create the code.
            </p>
            <Button
              onClick={() => {
                const { setViewMode } = useAppStore.getState();
                setViewMode('generate');
              }}
              variant="secondary"
            >
              Go to Code Generation
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

