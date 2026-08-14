const FADE_MASK = 'linear-gradient(to bottom, black, black 55%, transparent 100%)';

/**
 * `fixed` plutôt que `sticky` : la position est déterministe, indépendante des
 * subtilités de Safari iOS autour de `env(safe-area-inset-*)` sur les éléments sticky.
 * Le contenu de la page réserve exactement le même espace (voir App.jsx) — header et
 * contenu utilisent la même formule, donc toujours synchronisés, quelle que soit la
 * valeur réelle de la safe area sur l'appareil.
 */
export function AppHeader({ onLogoClick }) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-30"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-md"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      />
      <div className="relative px-4 pt-3 pb-2">
        <header className="glass-surface mx-auto flex max-w-lg items-center gap-3 rounded-3xl border border-neutral-200/60 px-3.5 py-2.5 shadow-[0_10px_30px_-8px_rgba(22,22,26,0.18)]">
          <button onClick={onLogoClick} className="flex items-center gap-3" aria-label="Retour à l'accueil">
            <img src={`${import.meta.env.BASE_URL}logo-focalis.png`} alt="" className="h-10 w-10 rounded-full" />
            <p className="text-base font-semibold tracking-tight text-neutral-900">Focalis</p>
          </button>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
        </header>
      </div>
    </div>
  );
}
