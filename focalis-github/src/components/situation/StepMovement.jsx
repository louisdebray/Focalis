import { MOVEMENT_OPTIONS } from '../../domain/situation/situationTypes.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';

export function StepMovement({ value, onSelect }) {
  return (
    <OptionGrid columns={2}>
      {MOVEMENT_OPTIONS.map((option) => (
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
