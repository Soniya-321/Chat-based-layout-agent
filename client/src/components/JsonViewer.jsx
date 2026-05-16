import { useState } from 'react';
import { CopyIcon, CheckIcon } from '../constants/icons';


export default function JsonViewer({ layout }) {
  const [copied, setCopied] = useState(false);
  const jsonStr = JSON.stringify(layout, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-700 overflow-hidden bg-[#1a1a2e]">

      {/* Mac-style title bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#111120] border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block" />
          <span className="text-xs text-slate-500 ml-2">layout.json</span>
        </div>

        {/* Copy button with icon */}
        <button
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy JSON'}
          className={`flex items-center gap-1.5 text-[11px] border rounded px-2.5 py-1 cursor-pointer transition-all
            ${copied
              ? 'text-green-400 bg-slate-800 border-green-700'
              : 'text-slate-400 bg-slate-800 border-slate-600 hover:text-white hover:bg-slate-700'
            }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* JSON content */}
      <pre className="flex-1 overflow-auto m-0 p-4 text-xs leading-relaxed text-white font-mono">
        {jsonStr}
      </pre>
    </div>
  );
}