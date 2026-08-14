/**
 * Fixe en haut (ne défile jamais), sans flou — la bulle entière ramène à l'accueil.
 * translateZ(0)/will-change force sa propre couche de composition : sur Safari iOS,
 * un position:fixed sans cette couche peut finir par défiler avec la page.
 */
export function AppHeader({ onLogoClick }) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-30 px-4 pb-2"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <button
        onClick={onLogoClick}
        aria-label="Retour à l'accueil"
        className="glass-surface mx-auto flex w-full max-w-lg items-center gap-3 rounded-3xl border border-neutral-200/60 px-3.5 py-2.5 shadow-[0_10px_30px_-8px_rgba(22,22,26,0.18)]"
      >
        <img src={`${import.meta.env.BASE_URL}logo-focalis.png`} alt="" className="h-10 w-10 rounded-full" />
        <p className="text-base font-semibold tracking-tight text-neutral-900">Focalis</p>
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
      </button>
    </div>
  );
}
