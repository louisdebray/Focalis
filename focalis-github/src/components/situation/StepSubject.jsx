import { SUBJECT_SUGGESTIONS } from '../../domain/situation/situationTypes.js';
import { TextInput } from '../ui/Field.jsx';
import { Button } from '../ui/Button.jsx';

export function StepSubject({ photoType, value, onChange, onContinue }) {
  const suggestions = SUBJECT_SUGGESTIONS[photoType] ?? [];

  return (
    <div className="flex flex-col gap-4">
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Décris ton sujet en quelques mots"
        autoFocus
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onChange(suggestion)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                value === suggestion
                  ? 'border-accent-500 bg-accent-50 text-accent-700'
                  : 'border-neutral-200 bg-white text-neutral-600'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <Button onClick={onContinue} disabled={!value.trim()}>
        Continuer
      </Button>
    </div>
  );
}
