import { useState } from 'react';
import { PHOTO_TYPES } from '../../domain/situation/situationTypes.js';
import { PresetCard } from './PresetCard.jsx';

export function PresetList({ presets, onRate, onRemove, onUse }) {
  const [filter, setFilter] = useState('all');

  if (presets.length === 0) {
    return <p className="text-sm text-neutral-400">Aucun preset enregistré pour le moment.</p>;
  }

  const typesPresent = PHOTO_TYPES.filter((t) => presets.some((p) => p.photoType === t.value));
  const filtered = filter === 'all' ? presets : presets.filter((p) => p.photoType === filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            filter === 'all' ? 'border-accent-500 bg-accent-50 text-accent-700' : 'border-neutral-200 text-neutral-600'
          }`}
        >
          Tous
        </button>
        {typesPresent.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setFilter(t.value)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              filter === t.value ? 'border-accent-500 bg-accent-50 text-accent-700' : 'border-neutral-200 text-neutral-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onRate={(rating) => onRate(preset.id, rating)}
            onRemove={() => onRemove(preset.id)}
            onUse={() => onUse(preset)}
          />
        ))}
      </div>
    </div>
  );
}
