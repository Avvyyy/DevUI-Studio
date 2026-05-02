import { useAppStore } from '../store/useAppStore';
import { ViewMode } from '../types';
import { Code2, Palette, Sparkles, GitMerge } from 'lucide-react';

interface NavItem {
  id: ViewMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  {
    id: 'codebase',
    label: 'Codebase',
    icon: <Code2 className="w-5 h-5" />,
    description: 'Understand your code'
  },
  {
    id: 'design',
    label: 'Design',
    icon: <Palette className="w-5 h-5" />,
    description: 'Generate UI designs'
  },
  {
    id: 'generate',
    label: 'Generate',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Create code'
  },
  {
    id: 'integrate',
    label: 'Integrate',
    icon: <GitMerge className="w-5 h-5" />,
    description: 'Connect components'
  }
];

export function Sidebar() {
  const { viewMode, setViewMode } = useAppStore();

  return (
    <aside className="w-64 bg-dark-secondary border-r border-dark-border flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-2xl font-bold text-accent-blue">DevUI Studio</h1>
        <p className="text-sm text-dark-muted mt-1">AI-Powered Dev Assistant</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setViewMode(item.id)}
            className={`
              w-full flex items-start gap-3 p-3 rounded-lg transition-all
              ${viewMode === item.id
                ? 'bg-dark-hover text-accent-blue border border-accent-blue/30'
                : 'text-dark-secondary hover:bg-dark-tertiary hover:text-dark-primary'
              }
            `}
          >
            <div className="mt-0.5">{item.icon}</div>
            <div className="flex-1 text-left">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-dark-muted mt-0.5">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-border">
        <div className="text-xs text-dark-muted">
          <p>Powered by IBM watsonx.ai</p>
          <p className="mt-1">© 2024 DevUI Studio</p>
        </div>
      </div>
    </aside>
  );
}

