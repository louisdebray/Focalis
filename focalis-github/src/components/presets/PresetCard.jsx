import { PHOTO_TYPES, DISTANCE_OPTIONS, MOVEMENT_OPTIONS, LIGHT_OPTIONS } from '../../domain/situation/situationTypes.js';
import { labelOf } from '../../domain/situation/labelHelpers.js';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { IconThumbUp, IconThumbDown, IconTrash } from '../icons/Icons.jsx';

export function PresetCard({ preset, onRate, onRemove, onUse }) {
  const photoType = PHOTO_TYPES.find((t) => t.value === preset.photoType);
  const IconComponent = photoType?.icon;
  const { lens } = preset.recommendation;

  const details = [
    preset.situation.distance.category && labelOf(DISTANCE_OPTIONS, preset.situation.distance.category),
    preset.situation.movement && labelOf(MOVEMENT_OPTIONS, preset.situation.movement),
    preset.situation.light && labelOf(LIGHT_OPTIONS, preset.situation.light),
  ].filter(Boolean);

  return (
    <Card className="flex flex-col gap-3 text-left">
      <div className="flex items-start gap-3">
        {IconComponent && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <IconComponent className="h-5 w-5" />
          </span>
        )}
        <div className="flex-1">
          <p className="font-semibold text-neutral-900">{preset.name}</p>
          {preset.situation.subject && <p className="text-sm text-neutral-500">{preset.situation.subject}</p>}
          {details.length > 0 && <p className="text-xs text-neutral-400">{details.join(' · ')}</p>}
        </div>
      </div>

      {(lens?.lensLabel || lens?.focalUsed) && (
        <p className="text-sm text-neutral-600">
          {lens.lensLabel ?? 'Objectif non précisé'}
          {lens.focalUsed ? ` · ${lens.focalUsed} mm` : ''}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 rounded-xl bg-neutral-50 py-2.5 text-center">
        <div>
          <p className="font-semibold text-neutral-900">f/{preset.recommendation.aperture.value}</p>
          <p className="text-xs text-neutral-400">Ouverture</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{preset.recommendation.shutterSpeed.value}</p>
          <p className="text-xs text-neutral-400">Vitesse</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{preset.recommendation.iso.value}</p>
          <p className="text-xs text-neutral-400">ISO</p>
        </div>
      </div>

      {preset.note && <p className="text-sm italic text-neutral-600">« {preset.note} »</p>}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRate(preset.rating === 1 ? 0 : 1)}
          aria-label="Ça a marché"
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
            preset.rating === 1 ? 'border-accent-500 bg-accent-50 text-accent-600' : 'border-neutral-200 text-neutral-400'
          }`}
        >
          <IconThumbUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onRate(preset.rating === -1 ? 0 : -1)}
          aria-label="Pas top"
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
            preset.rating === -1 ? 'border-danger-500 bg-red-50 text-danger-500' : 'border-neutral-200 text-neutral-400'
          }`}
        >
          <IconThumbDown className="h-4 w-4" />
        </button>
        <div className="flex-1" />
        <Button variant="ghost" className="px-3 py-2 text-sm" onClick={onUse}>
          Utiliser
        </Button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Supprimer"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-danger-500"
        >
          <IconTrash className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
