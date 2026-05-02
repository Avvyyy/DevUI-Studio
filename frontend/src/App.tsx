import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CodebaseView } from './components/views/CodebaseView';
import { DesignView } from './components/views/DesignView';
import { GenerateView } from './components/views/GenerateView';
import { IntegrateView } from './components/views/IntegrateView';

function App() {
  const { viewMode } = useAppStore();

  const renderView = () => {
    switch (viewMode) {
      case 'codebase':
        return <CodebaseView />;
      case 'design':
        return <DesignView />;
      case 'generate':
        return <GenerateView />;
      case 'integrate':
        return <IntegrateView />;
      default:
        return <CodebaseView />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-primary text-dark-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;


