import { IconSparkle, IconBackpack, IconBookmark } from '../icons/Icons.jsx';

const TABS = [
  { id: 'recommendation', icon: IconSparkle, label: 'Réglages' },
  { id: 'presets', icon: IconBookmark, label: 'Presets' },
  { id: 'gear', icon: IconBackpack, label: 'Matériel' },
];

const FADE_MASK = 'linear-gradient(to top, black, black 55%, transparent 100%)';

export function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 backdrop-blur-md"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      />
      <div className="relative px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
        <div className="glass-surface mx-auto flex max-w-lg items-center gap-1 rounded-3xl border border-neutral-200/60 p-1.5 shadow-[0_10px_30px_-8px_rgba(22,22,26,0.25)]">
          {TABS.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2.5 text-[11px] font-medium transition-colors"
              >
                {isActive && (
                  <span className="gradient-accent absolute inset-0 rounded-2xl shadow-[0_4px_12px_-3px_rgba(242,118,42,0.5)]" />
                )}
                <IconComponent
                  className={`relative z-10 h-5 w-5 transition-transform duration-200 ${
                    isActive ? 'scale-105 text-white' : 'text-neutral-400'
                  }`}
                />
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-neutral-500'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
