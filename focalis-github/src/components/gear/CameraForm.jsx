import { useState } from 'react';
import { createCamera, SENSOR_SIZE_LABELS } from '../../domain/gear/gearTypes.js';
import { Field, TextInput, Select, Toggle } from '../ui/Field.jsx';
import { Button } from '../ui/Button.jsx';

export function CameraForm({ initialCamera = null, onSave, onCancel }) {
  const [brand, setBrand] = useState(initialCamera?.brand ?? '');
  const [model, setModel] = useState(initialCamera?.model ?? '');
  const [sensorSize, setSensorSize] = useState(initialCamera?.sensorSize ?? 'unknown');
  const [hasStabilization, setHasStabilization] = useState(initialCamera?.hasStabilization ?? false);

  const canSave = brand.trim() && model.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSave) return;
    const camera = createCamera({ brand: brand.trim(), model: model.trim(), sensorSize, hasStabilization });
    if (initialCamera) camera.id = initialCamera.id;
    onSave(camera);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Marque">
        <TextInput value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Ex : Canon" autoFocus />
      </Field>
      <Field label="Modèle">
        <TextInput value={model} onChange={(e) => setModel(e.target.value)} placeholder="Ex : EOS R7" />
      </Field>
      <Field label="Taille du capteur" hint="Sert à calculer la focale équivalente 24×36">
        <Select value={sensorSize} onChange={(e) => setSensorSize(e.target.value)}>
          {Object.entries(SENSOR_SIZE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>
      <Toggle
        checked={hasStabilization}
        onChange={setHasStabilization}
        label="Stabilisation dans le boîtier (IBIS)"
      />
      <div className="mt-2 flex gap-3">
        <Button type="submit" disabled={!canSave} className="flex-1">
          Enregistrer
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
}
