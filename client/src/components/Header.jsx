import { LogoIcon, ResetBtnIcon, LeftArrowIcon, RightArrowIcon } from '../constants/icons';

export default function Header({ sidebarOpen, onToggleSidebar, onReset }) {
  return (
    <header className="h-[54px] border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 bg-white z-10">

      {/* Left: toggle + logo */}
      <div className="flex items-center gap-3">

        {/* Sidebar toggle with tooltip */}
        <div className="relative group">
          <button
            onClick={onToggleSidebar}
            className="w-8 h-8 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {sidebarOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
          </button>

          {/* Tooltip */}
          <div className="
            absolute left-0 top-full mt-2
            bg-slate-800 text-white text-[11px]
            px-2.5 py-1.5 rounded-md whitespace-nowrap
            shadow-md pointer-events-none
            opacity-0 group-hover:opacity-100
            translate-y-1 group-hover:translate-y-0
            transition-all duration-200 ease-out
            z-50
          ">
            {sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            {/* Arrow pointing up */}
            <div className="absolute -top-1 left-3 w-2 h-2 bg-slate-800 rotate-45" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
            <LogoIcon />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 leading-none py-0.5">
              Layout Agent
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-none">
              Chat-driven design transformations
            </p>
          </div>
        </div>
      </div>

      {/* Right: reset with tooltip */}
      <div className="relative group">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ResetBtnIcon />
          Reset
        </button>

        {/* Tooltip */}
        <div className="
          absolute right-0 top-full mt-2
          bg-slate-800 text-white text-[11px]
          px-2.5 py-1.5 rounded-md whitespace-nowrap
          shadow-md pointer-events-none
          opacity-0 group-hover:opacity-100
          translate-y-1 group-hover:translate-y-0
          transition-all duration-200 ease-out
          z-50
        ">
          Resets layout to original
          <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-800 rotate-45" />
        </div>
      </div>

    </header>
  );
}