export const LogoIcon = () => (
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

);

export const SendIcon = ({ disabled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 shrink-0 ${disabled ? 'text-slate-400' : 'text-white'}`}
    aria-hidden="true"
  >
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.112z"/>
    <path d="m21.854 2.147-10.94 10.939"/>
  </svg>
);

export const ResetBtnIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2v6h6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 8C4.5 4.5 8 2 12 2a10 10 0 1 1-9.5 13" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeftArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L4 7L9 12" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>  
  </svg>
);

export const RightArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2L10 7L5 12" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SparkleIcon = () => (
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
);

export const EyeIcon = ({ active }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <ellipse cx="6.5" cy="6.5" rx="5.5" ry="3.5" stroke={active ? '#1e293b' : '#94a3b8'} strokeWidth="1.3"/>
    <circle cx="6.5" cy="6.5" r="1.5" fill={active ? '#1e293b' : '#94a3b8'}/>
  </svg>
);

export const CodeIcon = ({ active }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M4 3.5L1 6.5L4 9.5" stroke={active ? '#1e293b' : '#94a3b8'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3.5L12 6.5L9 9.5" stroke={active ? '#1e293b' : '#94a3b8'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SplitIcon = ({ active }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="2" width="4.5" height="9" rx="1.2" stroke={active ? '#1e293b' : '#94a3b8'} strokeWidth="1.3"/>
    <rect x="7.5" y="2" width="4.5" height="9" rx="1.2" stroke={active ? '#1e293b' : '#94a3b8'} strokeWidth="1.3"/>
  </svg>
);

export const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    {/* Back rectangle */}
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    {/* Front rectangle with cut corner */}
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5 text-green-400"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);


export const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);