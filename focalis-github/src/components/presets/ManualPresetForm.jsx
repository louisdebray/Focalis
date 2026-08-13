import { useState } from 'react';
import { PHOTO_TYPES, createEmptySituation } from '../../domain/situation/situationTypes.js';
import { createEmptyRenderIntent } from '../../domain/rendering/renderIntents.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { Field, TextInput, NumberInput, Select } from '../ui/Field.jsx';
import { Button } from '../ui/Button.jsx';

const OTHER_LENS = '__other__';

export function ManualPresetForm({ gearLenses, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [photoType, setPhotoType] = useState('');
  const [subject, setSubject] = useState('');
  const [lensChoice, setLensChoice] = useState('');
  const [customLensLabel, setCustomLensLabel] = useState('');
  const [focalUsed, setFocalUsed] = useState('');
  const [aperture, setAperture] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [note, setNote] = useState('');

  const canSave = name.trim() && photoType && aperture !== '' && shutterSpeed.trim() && iso !== '';

  function handleSubmit() {
    if (!canSave) return;

    const selectedLens = gearLenses.find((l) => l.id === lensChoice);
    const lensLabel = selectedLens ? `${selectedLens.brand} ${selectedLens.model}` : customLensLabel.trim() || null;

    const situation = {
      ...createEmptySituation(),
      photoType,
      subject: subject.trim(),
    };

    const recommendation = {
      lens: {
        lensId: selectedLens?.id ?? null,
        lensLabel,
        focalUsed: focalUsed === '' ? null : Number(focalUsed),
        focalUsedEquivalent: focalUsed === '' ? null : Number(focalUsed),
        reason: 'Renseigné manuellement.',
        isIdeal: true,
      },
      mode: { value: '—', reason: '' },
      aperture: { value: Number(aperture), reason: '', compromise: null },
      shutterSpeed: { value: shutterSpeed.trim(), denominator: null, reason: '', compromise: null },
      iso: { value: Number(iso), reason: '', compromise: null },
      exposureCompensation: null,
      compromises: [],
      tips: [],
    };

    onSave({
      name: name.trim(),
      situation,
      renderIntent: createEmptyRenderIntent(),
      recommendation,
      note: note.trim(),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Field label="Nom du preset">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Trouvé au parc dimanche"
          autoFocus
        />
      </Field>

      <div>
        <p className="mb-1.5 text-sm font-medium text-neutral-700">Type de photo</p>
        <OptionGrid columns={2}>
          {PHOTO_TYPES.map((type) => (
            <OptionCard
              key={type.value}
              compact
              icon={type.icon}
              label={type.label}
              selected={photoType === type.value}
              onClick={() => setPhotoType(type.value)}
            />
          ))}
        </OptionGrid>
      </div>

      <Field label="Sujet" hint="Facultatif">
        <TextInput value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ex : Chat au soleil" />
      </Field>

      <Field label="Objectif utilisé" hint="Facultatif">
        {gearLenses.length > 0 && (
          <Select value={lensChoice} onChange={(e) => setLensChoice(e.target.value)}>
            <option value="">Choisir dans mon sac...</option>
            {gearLenses.map((lens) => (
              <option key={lens.id} value={lens.id}>
                {lens.brand} {lens.model}
              </option>
            ))}
            <option value={OTHER_LENS}>Autre / non listé</option>
          </Select>
        )}
        {(gearLenses.length === 0 || lensChoice === OTHER_LENS) && (
          <TextInput
            className="mt-2"
            value={customLensLabel}
            onChange={(e) => setCustomLensLabel(e.target.value)}
            placeholder="Ex : Sigma 18-300mm"
          />
        )}
      </Field>

      <Field label="Focale utilisée (mm)" hint="Facultatif">
        <NumberInput value={focalUsed} onChange={(e) => setFocalUsed(e.target.value)} placeholder="Ex : 135" />
      </Field>

      <div className="flex gap-3">
        <Field label="Ouverture (f/)">
          <NumberInput step="0.1" value={aperture} onChange={(e) => setAperture(e.target.value)} placeholder="Ex : 2.8" />
        </Field>
        <Field label="Vitesse">
          <TextInput value={shutterSpeed} onChange={(e) => setShutterSpeed(e.target.value)} placeholder="Ex : 1/500" />
        </Field>
        <Field label="ISO">
          <NumberInput value={iso} onChange={(e) => setIso(e.target.value)} placeholder="Ex : 400" />
        </Field>
      </div>

      <Field label="Note" hint="Facultatif">
        <TextInput value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex : a super bien marché" />
      </Field>

      <div className="mt-2 flex gap-3">
        <Button className="flex-1" disabled={!canSave} onClick={handleSubmit}>
          Enregistrer
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
