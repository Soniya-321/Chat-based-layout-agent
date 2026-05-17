import { SparkleIcon, UserIcon } from "../constants/icons";


export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex items-start gap-2 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>

      {/* AI avatar — light gray bg, dark icon */}
      {!isUser && (
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-200 flex-shrink-0 mb-0.5">
          <SparkleIcon />
        </div>
      )}

      {/* Message bubble */}
      <div className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words
        ${isUser
          ? 'bg-slate-700 text-white rounded-2xl rounded-tr-sm'
          : 'bg-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm'
        }`}
      >
        {content}
      </div>

      {/* User avatar — dark navy bg, white icon */}
      {isUser && (
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-700 flex-shrink-0 mb-0.5">
          <UserIcon />
        </div>
      )}
    </div>
  );
}