import { useState } from 'react';
import WireframePreview from './WireframePreview';
import JsonViewer from './JsonViewer';
import { EyeIcon, CodeIcon, SplitIcon } from '../constants/icons';

const tabs = [
    { id: 'wireframe', Icon: EyeIcon,   label: 'Wireframe' },
    { id: 'json',      Icon: CodeIcon,  label: 'JSON' },
    { id: 'split',     Icon: SplitIcon, label: 'Split view' },
  ];

export default function DesignPanel({ layout }) {
  const [view, setView] = useState('wireframe');

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden ">

      {/* Tab bar */}
      <div className="flex items-center justify-between px-5 h-12 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 my-2">
          {tabs.map(({ id, Icon, label }) => {
            const active = view === id;
            return (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex items-center text-sm font-bold gap-1.5 px-3 py-1 rounded-lg text-[13px] transition-all cursor-pointer
                  ${active
                    ? 'bg-white text-slate-800 font-medium shadow-sm'
                    : 'bg-transparent border border-transparent text-slate-400 font-normal'
                  }`}
              >
                <Icon active={active} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel content */}
      <div className="flex flex-1 overflow-hidden">

        {view === 'wireframe' && (
          <div className="flex-1 overflow-auto p-8 flex flex-col items-center">
            <div className="w-full max-w-[560px]">
              <WireframePreview layout={layout} />
            </div>
          </div>
        )}

        {view === 'json' && (
          <div className="flex-1 overflow-hidden p-5">
            <JsonViewer layout={layout} />
          </div>
        )}

        {view === 'split' && (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto min-h-full p-3 border-r border-gray-200 bg-gray-50 flex flex-col items-center">
              <div className="w-full min-h-800px max-h-1000px border border-gray-300 rounded-lg p-3">
                <WireframePreview layout={layout} />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-3 border-r border-gray-200 bg-gray-50 flex flex-col items-center">
              <div className="w-full min-h-full border border-slate-300 rounded-lg p-3">
                <JsonViewer layout={layout} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}