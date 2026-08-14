import { SENSOR_SIZE_LABELS } from '../../domain/gear/gearTypes.js';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

export function CameraSummary({ camera, onEdit, onRemove }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-neutral-900">
            {camera.brand} {camera.model}
          </p>
          <p className="text-sm text-neutral-500">
            {camera.sensorSize === 'unknown' ? 'Capteur inconnu' : SENSOR_SIZE_LABELS[camera.sensorSize]}
            {camera.hasStabilization && ' · IBIS'}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button variant="ghost" className="px-3 py-2 text-sm" onClick={onEdit}>
          Modifier
        </Button>
        <Button variant="danger" className="px-3 py-2 text-sm" onClick={onRemove}>
          Supprimer
        </Button>
      </div>
    </Card>
  );
}
