import { createPortal } from 'react-dom';

/**
 * Bottom sheet avec overlay flouté, glissement d'entrée et poignée de préhension.
 * Rendu via portail dans document.body : un `position: fixed` reste piégé dans les
 * bornes de tout ancêtre qui a une transform (ex. l'animation de transition de page),
 * le portail évite ce piège une fois pour toutes.
 */
export function Sheet({ title, onClose, children }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="animate-overlay-fade-in absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
      />
      <div className="animate-sheet-slide-up relative flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-[0_-12px_40px_-8px_rgba(22,22,26,0.35)]">
        <div className="flex justify-center pt-2.5">
          <div className="h-1.5 w-10 rounded-full bg-neutral-200" />
        </div>
        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          <button onClick={onClose} className="p-1 text-neutral-400" aria-label="Fermer">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-[max(env(safe-area-inset-bottom),16px)]">{children}</div>
      </div>
    </div>,
    document.body
  );
}
