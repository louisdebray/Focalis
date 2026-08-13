import { IconLens, IconManualControl, IconOther, IconShutterSpeed, IconIso, IconWarning } from '../icons/Icons.jsx';
import { SettingBadge } from './SettingBadge.jsx';
import { Card } from '../ui/Card.jsx';

export function RecommendationCard({ recommendation }) {
  const { lens, mode, aperture, shutterSpeed, iso, exposureCompensation, compromises, tips } = recommendation;

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex items-start gap-3 text-left">
        <span className="gradient-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_4px_12px_-3px_rgba(242,118,42,0.5)]">
          <IconLens className="h-6 w-6" />
        </span>
        <div>
          <p className="font-semibold text-neutral-900">
            {lens.lensLabel ?? 'Focale recommandée'} · {lens.focalUsed} mm
          </p>
          <p className="text-sm text-neutral-500">{lens.reason}</p>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2.5">
        <SettingBadge icon={IconOther} label="Ouverture" value={`f/${aperture.value}`} />
        <SettingBadge icon={IconShutterSpeed} label="Vitesse" value={shutterSpeed.value} />
        <SettingBadge icon={IconIso} label="ISO" value={iso.value} />
      </div>

      <Card className="flex items-center gap-3 text-left">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
          <IconManualControl className="h-5 w-5" />
        </span>
        <div>
          <p className="font-medium text-neutral-900">{mode.value}</p>
          <p className="text-xs text-neutral-500">{mode.reason}</p>
        </div>
      </Card>

      {exposureCompensation && (
        <Card className="text-left">
          <p className="text-sm text-neutral-700">
            <strong>Compensation d'exposition :</strong> {exposureCompensation.value > 0 ? '+' : ''}
            {exposureCompensation.value} IL
          </p>
          <p className="text-xs text-neutral-500">{exposureCompensation.reason}</p>
        </Card>
      )}

      {compromises.length > 0 && (
        <div className="flex flex-col gap-2">
          {compromises.map((c, i) => (
            <Card key={i} className="border-amber-200 bg-amber-50 text-left">
              <div className="flex gap-2.5">
                <IconWarning className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-800">{c.limitation}</p>
                  <p className="text-xs text-amber-700">{c.advice}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tips.length > 0 && (
        <Card className="text-left">
          <p className="mb-2 text-sm font-medium text-neutral-800">Astuces</p>
          <ul className="flex flex-col gap-1.5">
            {tips.map((tip, i) => (
              <li key={i} className="text-sm text-neutral-600">
                · {tip}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
