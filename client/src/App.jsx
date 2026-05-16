import { useState, useRef, useCallback, useEffect } from 'react';
import { useLayoutAgent } from './hooks/useLayoutAgent';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DesignPanel from './components/DesignPanel';

export default function App() {
  const { layout, messages, loading, sendMessage, resetLayout } = useLayoutAgent();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(460);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth]);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const delta = e.clientX - startX.current;
      const next = Math.min(700, Math.max(300, startWidth.current + delta));
      setSidebarWidth(next);
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans bg-white overflow-hidden">

      {/* ── TOP HEADER ── */}
      <header className="h-[54px] border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 bg-white z-10">

        {/* Left: toggle + logo */}
        <div className="flex items-center gap-3">

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="w-8 h-8 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              {sidebarOpen
                ? <path d="M9 2L4 7L9 12" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M5 2L10 7L5 12" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
                <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
              </svg>
            </div>
            <div className="gap-1">
              <h1 className="text-sm font-semibold text-slate-900 leading-none py-0.5">Layout Agent</h1>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-none">Chat-driven design transformations</p>
            </div>
          </div>
        </div>

        {/* Right: reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetLayout}
            className="flex items-center gap-1.5 text-xs text-slate-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer ml-1"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10.5 6a4.5 4.5 0 11-1.32-3.18" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M10.5 2v2.5H8" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reset
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── CHAT SIDEBAR ── */}
        {sidebarOpen && (
          <>
            <div
              style={{ width: sidebarWidth }}
              className="flex-shrink-0 flex flex-col bg-white border-r border-gray-200 overflow-hidden"
            >
              {/* Chat header */}
              <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-slate-100 flex-shrink-0">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                    <path d="M20 3v4"/><path d="M22 5h-4"/>
                    <path d="M4 17v2"/><path d="M5 18H3"/>
                  </svg>
                </div>
                <div className="gap-2">
                  <p className="text-sm font-semibold text-slate-900">Layout Agent</p>
                  <p className="text-[11px] text-slate-400">Chat to transform your design</p>
                </div>
              </div>

              <ChatWindow messages={messages} loading={loading} />
              <ChatInput onSend={sendMessage} loading={loading} />
            </div>

            {/* ── DRAG HANDLE ── */}
            <div
              onMouseDown={onMouseDown}
              className="w-1 flex-shrink-0 cursor-col-resize bg-transparent hover:bg-indigo-300 transition-colors z-10"
            />
          </>
        )}

        {/* ── DESIGN PANEL ── */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <DesignPanel layout={layout} />
        </div>
      </div>
    </div>
  );
}