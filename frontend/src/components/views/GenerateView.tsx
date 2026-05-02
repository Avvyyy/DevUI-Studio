import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { apiService } from '../../services/api.service';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Code2, Download, Copy, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';

export function GenerateView() {
  const { generatedCode, setGeneratedCode, isLoading, setLoading, setError } = useAppStore();

  const [description, setDescription] = useState('');
  const [framework, setFramework] = useState<'react' | 'vue'>('react');
  const [styling, setStyling] = useState<'tailwind' | 'css'>('tailwind');
  const [codeType, setCodeType] = useState<'frontend' | 'backend'>('frontend');
  const [language, setLanguage] = useState('typescript');
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    if (!description.trim()) {
      setError('Please provide a code description');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (codeType === 'frontend') {
        response = await apiService.generateUICode(description, framework, styling);
      } else {
        response = await apiService.generateBackendCode(description, language);
      }
      
      setGeneratedCode(response.code);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCode = () => {
    if (generatedCode) {
      const extension = codeType === 'frontend' 
        ? (framework === 'react' ? 'tsx' : 'vue')
        : (language === 'typescript' ? 'ts' : language);
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-code.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        title="Code Generation"
        description="Generate frontend or backend code from descriptions"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Code Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setCodeType('frontend')}
                className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                  codeType === 'frontend'
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-dark-tertiary text-dark-primary border-dark-border hover:bg-dark-hover'
                }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setCodeType('backend')}
                className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                  codeType === 'backend'
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-dark-tertiary text-dark-primary border-dark-border hover:bg-dark-hover'
                }`}
              >
                Backend
              </button>
            </div>
          </div>

          {codeType === 'frontend' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-primary mb-2">
                  Framework
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as 'react' | 'vue')}
                  className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-primary mb-2">
                  Styling
                </label>
                <select
                  value={styling}
                  onChange={(e) => setStyling(e.target.value as 'tailwind' | 'css')}
                  className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="tailwind">Tailwind CSS</option>
                  <option value="css">Plain CSS</option>
                </select>
              </div>
            </div>
          )}

          {codeType === 'backend' && (
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Code Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to build (e.g., 'A user profile card component with avatar, name, and bio')"
              className="w-full px-4 py-3 bg-dark-tertiary border border-dark-border rounded-lg text-dark-primary placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
              rows={4}
            />
          </div>

          <Button
            onClick={handleGenerateCode}
            isLoading={isLoading}
            disabled={!description.trim()}
            icon={<Code2 className="w-4 h-4" />}
            className="w-full"
          >
            Generate Code
          </Button>
        </div>
      </Card>

      {isLoading && (
        <Card>
          <LoadingSpinner size="lg" message="Generating code..." />
        </Card>
      )}

      {generatedCode && !isLoading && (
        <Card
          title="Generated Code"
          actions={
            <div className="flex gap-2">
              <Button
                onClick={handleCopyCode}
                variant="secondary"
                size="sm"
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                onClick={handleDownloadCode}
                variant="secondary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Download
              </Button>
            </div>
          }
        >
          <div className="rounded-lg overflow-hidden border border-dark-border">
            <Editor
              height="500px"
              defaultLanguage={codeType === 'frontend' ? 'typescript' : language}
              value={generatedCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

