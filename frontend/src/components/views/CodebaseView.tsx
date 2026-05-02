import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { apiService } from '../../services/api.service';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { FileUpload } from '../shared/FileUpload';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { MessageSquare, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function CodebaseView() {
  const {
    setUploadedFiles,
    explanation,
    setExplanation,
    isLoading,
    setLoading,
    setError,
  } = useAppStore();

  const [files, setFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');

  const handleExplainCode = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.explainCode(files, question || undefined);
      setExplanation(response.explanation);
      setUploadedFiles(
        files.map((file) => ({
          name: file.name,
          content: '',
          file,
        }))
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to explain code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestFeatureLocation = async () => {
    if (files.length === 0 || !featureDescription.trim()) {
      setError('Please upload files and provide a feature description');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.suggestFeatureLocation(files, featureDescription);
      setExplanation(response.suggestion);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to suggest feature location';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Upload Codebase"
        description="Upload your code files to analyze and understand"
      >
        <FileUpload files={files} onFilesChange={setFiles} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Explain Code"
          description="Get AI-powered explanations of your codebase"
          actions={
            <Button
              onClick={handleExplainCode}
              isLoading={isLoading}
              disabled={files.length === 0}
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Explain
            </Button>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">
                Optional Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a specific question about your code..."
                className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
                rows={3}
              />
            </div>
          </div>
        </Card>

        <Card
          title="Feature Location"
          description="Find where to implement new features"
          actions={
            <Button
              onClick={handleSuggestFeatureLocation}
              isLoading={isLoading}
              disabled={files.length === 0 || !featureDescription.trim()}
              icon={<Lightbulb className="w-4 h-4" />}
            >
              Suggest
            </Button>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">
                Feature Description
              </label>
              <textarea
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
                placeholder="Describe the feature you want to implement..."
                className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
                rows={3}
              />
            </div>
          </div>
        </Card>
      </div>

      {isLoading && (
        <Card>
          <LoadingSpinner size="lg" message="Analyzing your codebase..." />
        </Card>
      )}

      {explanation && !isLoading && (
        <Card title="Analysis Result">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
}

