import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { NumberInput, Field } from '../ui/Field.jsx';
import { IconTripod, IconHandheld, IconLeg3, IconLeg4 } from '../icons/Icons.jsx';

const LEG_SECTIONS_OPTIONS = [
  { value: 3, label: '3 brins', description: 'Plus stable, se déploie vite', icon: IconLeg3 },
  { value: 4, label: '4 brins', description: 'Plus compact, un peu moins rigide', icon: IconLeg4 },
];

export function TripodSection({ tripod, onChange }) {
  function toggleAvailable() {
    if (tripod.available) {
      onChange({ available: false, maxHeightCm: null, legSections: null });
    } else {
      onChange({ ...tripod, available: true });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <OptionGrid columns={2}>
        <OptionCard
          icon={IconTripod}
          label="J'ai un trépied"
          selected={tripod.available}
          onClick={toggleAvailable}
        />
        <OptionCard
          icon={IconHandheld}
          label="Pas de trépied"
          selected={!tripod.available}
          onClick={toggleAvailable}
        />
      </OptionGrid>

      {tripod.available && (
        <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
          <Field label="Hauteur max (cm)" hint="Colonne centrale non déployée, pour rester stable">
            <NumberInput
              value={tripod.maxHeightCm ?? ''}
              onChange={(e) =>
                onChange({ ...tripod, maxHeightCm: e.target.value === '' ? null : Number(e.target.value) })
              }
              placeholder="Ex : 150"
            />
          </Field>

          <div>
            <p className="mb-1.5 text-sm font-medium text-neutral-700">Nombre de brins par pied</p>
            <OptionGrid columns={2}>
              {LEG_SECTIONS_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  compact
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  selected={tripod.legSections === option.value}
                  onClick={() => onChange({ ...tripod, legSections: option.value })}
                />
              ))}
            </OptionGrid>
          </div>
        </div>
      )}
    </div>
  );
}
