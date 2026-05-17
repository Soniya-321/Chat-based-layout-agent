import { useLayoutAgent } from './hooks/useLayoutAgent';
import { useSidebar } from './hooks/useSidebar';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DesignPanel from './components/DesignPanel';

export default function App() {
  const { layout, messages, loading, sendMessage, resetLayout } = useLayoutAgent();
  const { sidebarOpen, toggleSidebar, sidebarWidth, onDragStart } = useSidebar(460);

  return (
    <div className="flex flex-col h-screen font-sans bg-white overflow-hidden">

      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onReset={resetLayout}
      />

      <div className="flex flex-1 overflow-hidden">

        {sidebarOpen && (
          <Sidebar
            messages={messages}
            loading={loading}
            onSend={sendMessage}
            width={sidebarWidth}
            onDragStart={onDragStart}
          />
        )}

        <div className="flex-1 overflow-hidden flex flex-col">
          <DesignPanel layout={layout} />
        </div>

      </div>
    </div>
  );
}