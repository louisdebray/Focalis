import { useState } from 'react';
import { Field, TextInput } from '../ui/Field.jsx';
import { Button } from '../ui/Button.jsx';

export function PresetForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <Field label="Nom du preset">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Zoo l'après-midi"
          autoFocus
        />
      </Field>
      <Field label="Note (facultatif)" hint="Ce qui a bien ou moins bien marché, pour t'en souvenir plus tard">
        <TextInput value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex : a super bien marché" />
      </Field>
      <div className="flex gap-3">
        <Button
          className="flex-1"
          disabled={!name.trim()}
          onClick={() => onSave({ name: name.trim(), note: note.trim() })}
        >
          Enregistrer
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
