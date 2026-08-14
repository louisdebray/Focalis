import { DISTANCE_OPTIONS } from '../../domain/situation/situationTypes.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { NumberInput, Field } from '../ui/Field.jsx';

export function StepDistance({ value, onChange, onSelectCategory }) {
  return (
    <div className="flex flex-col gap-4">
      <OptionGrid columns={2}>
        {DISTANCE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            label={option.label}
            description={option.description}
            selected={value.category === option.value}
            onClick={() => onSelectCategory(option.value)}
          />
        ))}
      </OptionGrid>
      <Field label="Distance précise en mètres" hint="Facultatif — affine la recommandation">
        <NumberInput
          value={value.meters ?? ''}
          onChange={(e) => onChange({ ...value, meters: e.target.value === '' ? null : Number(e.target.value) })}
          placeholder="Ex : 15"
        />
      </Field>
    </div>
  );
}
