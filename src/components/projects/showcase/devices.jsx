// Device frames for the showcase mockups. Canvas sizes are fixed; <Fit>
// scales them to the stage.
export const LAPTOP = { width: 720, height: 460 };
export const PHONE = { width: 300, height: 600 };

export function Laptop({ children, screenClassName = "bg-bg text-ink" }) {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="h-[442px] w-[684px] rounded-[20px] border border-white/10 bg-[#0E1117] p-[10px] shadow-glow-soft">
        <div className={`relative h-full w-full overflow-hidden rounded-[11px] ${screenClassName}`}>{children}</div>
      </div>
      <div className="relative h-[16px] w-[720px] rounded-b-[16px] rounded-t-[4px] bg-gradient-to-b from-[#2A2F3A] to-[#14171D]">
        <span className="absolute left-1/2 top-0 h-[6px] w-[110px] -translate-x-1/2 rounded-b-[6px] bg-black/40" />
      </div>
    </div>
  );
}

export function Phone({ children, className = "" }) {
  return (
    <div className={`h-full w-full rounded-[46px] border border-white/10 bg-[#0E1117] p-[10px] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[36px]">
        <span className="absolute left-1/2 top-[10px] z-20 h-[24px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

/** Top bar shared by the laptop screens. */
export function AppBar({ title, children }) {
  return (
    <div className="flex h-[52px] items-center gap-3 border-b border-line bg-surface px-5">
      <span className="grid h-[26px] w-[26px] place-items-center rounded-[8px] bg-accent font-display text-[10px] font-bold text-night">
        SW
      </span>
      <span className="text-[14px] font-semibold">{title}</span>
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  );
}
