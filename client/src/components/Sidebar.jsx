import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { SparkleIcon } from '../constants/icons';

export default function Sidebar({ messages, loading, onSend, width, onDragStart }) {
  return (
    <>
      {/* Sidebar panel */}
      <div
        style={{ width }}
        className="flex-shrink-0 flex flex-col bg-white border-r border-gray-200 overflow-hidden"
      >
        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-slate-100 flex-shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 flex-shrink-0">
            <SparkleIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Layout Agent</p>
            <p className="text-[11px] text-slate-400">Chat to transform your design</p>
          </div>
        </div>

        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={onSend} loading={loading} />
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        className="w-1 flex-shrink-0 cursor-col-resize bg-transparent hover:bg-slate-300 transition-colors z-10"
      />
    </>
  );
}