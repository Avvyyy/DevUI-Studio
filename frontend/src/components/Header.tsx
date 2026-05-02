import { useAppStore } from '../store/useAppStore';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export function Header() {
  const { viewMode, isLoading, error } = useAppStore();

  const getViewTitle = () => {
    switch (viewMode) {
      case 'codebase':
        return 'Codebase Understanding';
      case 'design':
        return 'Design Generation';
      case 'generate':
        return 'Code Generation';
      case 'integrate':
        return 'Integration Guidance';
      default:
        return 'DevUI Studio';
    }
  };

  const getViewDescription = () => {
    switch (viewMode) {
      case 'codebase':
        return 'Upload and analyze your codebase to understand its structure and functionality';
      case 'design':
        return 'Generate UI/UX designs from descriptions using AI';
      case 'generate':
        return 'Create frontend and backend code from specifications';
      case 'integrate':
        return 'Get guidance on integrating frontend and backend components';
      default:
        return '';
    }
  };

  return (
    <header className="bg-dark-secondary border-b border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-dark-primary">{getViewTitle()}</h2>
          <p className="text-sm text-dark-muted mt-1">{getViewDescription()}</p>
        </div>

        <div className="flex items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-accent-blue">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-accent-red">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Error occurred</span>
            </div>
          )}

          {!isLoading && !error && (
            <div className="flex items-center gap-2 text-accent-green">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Ready</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

