import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { SparkleIcon } from '../constants/icons';


export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-0.5 bg-white">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}

      {loading && (
        <div className="flex items-end gap-2 mb-3">
          {/* Same AI avatar style */}
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
            <SparkleIcon />
          </div>
          {/* Typing dots */}
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}