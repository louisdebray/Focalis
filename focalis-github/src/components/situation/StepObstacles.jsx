import { OBSTACLE_OPTIONS } from '../../domain/situation/situationTypes.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { Button } from '../ui/Button.jsx';

export function StepObstacles({ value, onChange, onContinue }) {
  function toggle(obstacle) {
    onChange(value.includes(obstacle) ? value.filter((o) => o !== obstacle) : [...value, obstacle]);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-neutral-500">Sélectionne les contraintes présentes, s'il y en a.</p>
      <OptionGrid columns={2}>
        {OBSTACLE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            label={option.label}
            selected={value.includes(option.value)}
            onClick={() => toggle(option.value)}
          />
        ))}
      </OptionGrid>
      <Button onClick={onContinue}>{value.length > 0 ? 'Continuer' : 'Aucune contrainte, continuer'}</Button>
    </div>
  );
}
