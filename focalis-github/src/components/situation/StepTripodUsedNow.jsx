import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { IconTripod, IconHandheld } from '../icons/Icons.jsx';

export function StepTripodUsedNow({ value, onSelect }) {
  return (
    <OptionGrid columns={2}>
      <OptionCard icon={IconTripod} label="Oui, au trépied" selected={value === true} onClick={() => onSelect(true)} />
      <OptionCard icon={IconHandheld} label="Non, à main levée" selected={value === false} onClick={() => onSelect(false)} />
    </OptionGrid>
  );
}
