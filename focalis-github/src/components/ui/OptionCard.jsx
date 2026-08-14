import { IconCheck } from '../icons/Icons.jsx';

/**
 * Carte de choix visuelle (icône + label + description courte).
 * Utilisée pour tous les choix "à la carte" : type de photo, rendu recherché, trépied, etc.
 */
export function OptionCard({ icon: IconComponent, label, description, selected, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex flex-col items-center gap-2 rounded-2xl border text-center transition-all duration-200 ease-out ${
        compact ? 'px-2.5 py-3' : 'px-3 py-5'
      } ${
        selected
          ? 'border-transparent bg-gradient-to-b from-accent-50 to-accent-100 shadow-[0_6px_18px_-6px_rgba(242,118,42,0.4)] -translate-y-0.5'
          : 'border-neutral-200 bg-white active:scale-[0.97] active:border-neutral-300'
      }`}
    >
      {selected && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 animate-pop-in items-center justify-center rounded-full bg-accent-500 text-white shadow-sm">
          <IconCheck className="h-3 w-3" />
        </span>
      )}
      <span
        className={`flex items-center justify-center rounded-xl transition-all duration-200 ${
          compact ? 'h-9 w-9' : 'h-11 w-11'
        } ${
          selected
            ? 'gradient-accent text-white shadow-[0_4px_10px_-2px_rgba(242,118,42,0.55)]'
            : 'bg-neutral-100 text-neutral-500'
        }`}
      >
        <IconComponent className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
      </span>
      <span className={`font-medium ${compact ? 'text-sm' : 'text-[15px]'} text-neutral-900`}>{label}</span>
      {description && <span className="text-xs leading-snug text-neutral-500">{description}</span>}
    </button>
  );
}

export function OptionGrid({ children, columns = 2 }) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}
