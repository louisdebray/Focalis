import { LIGHT_OPTIONS } from '../../domain/situation/situationTypes.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';

export function StepLight({ value, onSelect }) {
  return (
    <OptionGrid columns={2}>
      {LIGHT_OPTIONS.map((option) => (
        <OptionCard
          key={option.value}
          icon={option.icon}
          label={option.label}
          selected={value === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </OptionGrid>
  );
}
