export function AppHeader() {
  return (
    <header className="glass-surface sticky top-0 z-30 flex items-center gap-2.5 border-b border-neutral-200/70 px-4 py-3">
      <img src="/logo-focalis.png" alt="" className="h-7 w-7 rounded-full" />
      <p className="text-[15px] font-semibold tracking-tight text-neutral-900">
        Focalis
      </p>
      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
    </header>
  );
}
