export function AppHeader({ onLogoClick }) {
  return (
    <header className="glass-surface sticky top-0 z-30 flex items-center gap-2.5 border-b border-neutral-200/70 px-4 py-3">
      <button onClick={onLogoClick} className="flex items-center gap-2.5" aria-label="Retour à l'accueil">
        <img src={`${import.meta.env.BASE_URL}logo-focalis.png`} alt="" className="h-7 w-7 rounded-full" />
        <p className="text-[15px] font-semibold tracking-tight text-neutral-900">Focalis</p>
      </button>
      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
    </header>
  );
}
