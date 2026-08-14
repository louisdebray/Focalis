import { isZoomLens, isVariableAperture } from '../../domain/gear/gearTypes.js';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

function formatFocal(lens) {
  return isZoomLens(lens) ? `${lens.focalMin}-${lens.focalMax}mm` : `${lens.focalMin}mm`;
}

function formatAperture(lens) {
  return isVariableAperture(lens)
    ? `f/${lens.apertureMaxAtFocalMin}-${lens.apertureMaxAtFocalMax}`
    : `f/${lens.apertureMaxAtFocalMin}`;
}

export function LensList({ lenses, onEdit, onRemove, onMount }) {
  if (lenses.length === 0) {
    return <p className="text-sm text-neutral-400">Aucun objectif ajouté pour le moment.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {lenses.map((lens) => (
        <Card key={lens.id} className={lens.isMounted ? 'border-accent-400' : ''}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-neutral-900">
                  {lens.brand} {lens.model}
                </p>
                {lens.isMounted && (
                  <span className="rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-600">
                    Monté
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-500">
                {formatFocal(lens)} · {formatAperture(lens)}
                {lens.hasStabilization && ' · stabilisé'}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {!lens.isMounted && (
              <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => onMount(lens.id)}>
                Monter
              </Button>
            )}
            <Button variant="ghost" className="px-3 py-2 text-sm" onClick={() => onEdit(lens)}>
              Modifier
            </Button>
            <Button variant="danger" className="px-3 py-2 text-sm" onClick={() => onRemove(lens.id)}>
              Supprimer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
