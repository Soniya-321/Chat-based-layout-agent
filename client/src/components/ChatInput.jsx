import { useState } from 'react';
import { SendIcon } from '../constants/icons';
import { SUGGESTIONS } from '../constants/suggestions';


export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState('');
  const isDisabled = loading || !text.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="border-t border-slate-100 px-3 pt-2.5 pb-3 bg-white flex-shrink-0">

      {/* Suggestion chips — match image: plain gray, no color on hover */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            className="text-[11.5px] text-slate-500 bg-white border border-slate-200 rounded-full px-2.5 py-1 cursor-pointer hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask to resize, move, restyle..."
          disabled={loading}
          className="flex-1 bg-gray-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:opacity-60 transition-all"
        />

        {/* Send button — dark navy matching user bubble */}
        <button
          type="submit"
          disabled={isDisabled}
          title="Send"
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
            ${isDisabled
              ? 'bg-slate-100 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-700 cursor-pointer'
            }`}
        >
          <SendIcon disabled={isDisabled} />
        </button>
      </form>
    </div>
  );
}