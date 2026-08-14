import { PHOTO_TYPES } from '../../domain/situation/situationTypes.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';

export function StepPhotoType({ value, onSelect }) {
  return (
    <OptionGrid columns={2}>
      {PHOTO_TYPES.map((type) => (
        <OptionCard
          key={type.value}
          icon={type.icon}
          label={type.label}
          selected={value === type.value}
          onClick={() => onSelect(type.value)}
        />
      ))}
    </OptionGrid>
  );
}
