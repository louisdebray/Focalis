import { useState } from 'react';
import { createLens } from '../../domain/gear/gearTypes.js';
import { Field, TextInput, NumberInput, Toggle } from '../ui/Field.jsx';
import { Button } from '../ui/Button.jsx';

export function LensForm({ initialLens = null, onSave, onCancel }) {
  const [brand, setBrand] = useState(initialLens?.brand ?? '');
  const [model, setModel] = useState(initialLens?.model ?? '');
  const [isZoom, setIsZoom] = useState(initialLens ? initialLens.focalMax > initialLens.focalMin : false);
  const [focalMin, setFocalMin] = useState(initialLens?.focalMin ?? '');
  const [focalMax, setFocalMax] = useState(initialLens?.focalMax ?? '');
  const [isVariableAperture, setIsVariableAperture] = useState(
    initialLens ? initialLens.apertureMaxAtFocalMin !== initialLens.apertureMaxAtFocalMax : false
  );
  const [apertureMaxAtFocalMin, setApertureMaxAtFocalMin] = useState(
    initialLens?.apertureMaxAtFocalMin ?? ''
  );
  const [apertureMaxAtFocalMax, setApertureMaxAtFocalMax] = useState(
    initialLens?.apertureMaxAtFocalMax ?? ''
  );
  const [apertureMin, setApertureMin] = useState(initialLens?.apertureMin ?? '');
  const [hasStabilization, setHasStabilization] = useState(initialLens?.hasStabilization ?? false);

  const canSave =
    brand.trim() &&
    model.trim() &&
    focalMin !== '' &&
    (!isZoom || focalMax !== '') &&
    apertureMaxAtFocalMin !== '' &&
    (!isVariableAperture || apertureMaxAtFocalMax !== '');

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSave) return;
    const lens = createLens({
      brand: brand.trim(),
      model: model.trim(),
      focalMin: Number(focalMin),
      focalMax: isZoom ? Number(focalMax) : Number(focalMin),
      apertureMaxAtFocalMin: Number(apertureMaxAtFocalMin),
      apertureMaxAtFocalMax: isVariableAperture ? Number(apertureMaxAtFocalMax) : Number(apertureMaxAtFocalMin),
      apertureMin: apertureMin === '' ? Number(apertureMaxAtFocalMin) * 2 : Number(apertureMin),
      hasStabilization,
      isMounted: initialLens?.isMounted ?? false,
    });
    if (initialLens) lens.id = initialLens.id;
    onSave(lens);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Marque">
        <TextInput value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Ex : Sigma" autoFocus />
      </Field>
      <Field label="Modèle">
        <TextInput value={model} onChange={(e) => setModel(e.target.value)} placeholder="Ex : 70-200mm f/2.8" />
      </Field>

      <Toggle checked={isZoom} onChange={setIsZoom} label="C'est un zoom (focale variable)" />

      <div className="flex gap-3">
        <Field className="flex-1" label={isZoom ? 'Focale mini (mm)' : 'Focale (mm)'}>
          <NumberInput value={focalMin} onChange={(e) => setFocalMin(e.target.value)} placeholder="Ex : 70" />
        </Field>
        {isZoom && (
          <Field className="flex-1" label="Focale maxi (mm)">
            <NumberInput value={focalMax} onChange={(e) => setFocalMax(e.target.value)} placeholder="Ex : 200" />
          </Field>
        )}
      </div>

      {isZoom && (
        <Toggle
          checked={isVariableAperture}
          onChange={setIsVariableAperture}
          label="Ouverture variable selon la focale"
        />
      )}

      <div className="flex gap-3">
        <Field className="flex-1" label={isVariableAperture ? 'Grand-angle (f/)' : 'Ouverture maximale (f/)'}>
          <NumberInput
            step="0.1"
            value={apertureMaxAtFocalMin}
            onChange={(e) => setApertureMaxAtFocalMin(e.target.value)}
            placeholder="Ex : 2.8"
          />
        </Field>
        {isVariableAperture && (
          <Field className="flex-1" label="Télé (f/)">
            <NumberInput
              step="0.1"
              value={apertureMaxAtFocalMax}
              onChange={(e) => setApertureMaxAtFocalMax(e.target.value)}
              placeholder="Ex : 5.6"
            />
          </Field>
        )}
      </div>

      <Field label="Ouverture minimale (f/)" hint="Facultatif — estimée automatiquement si vide">
        <NumberInput step="0.1" value={apertureMin} onChange={(e) => setApertureMin(e.target.value)} placeholder="Ex : 22" />
      </Field>

      <Toggle checked={hasStabilization} onChange={setHasStabilization} label="Stabilisation optique (OIS)" />

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
