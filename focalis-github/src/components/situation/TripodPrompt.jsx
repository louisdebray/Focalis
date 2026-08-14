import { StepTripodUsedNow } from './StepTripodUsedNow.jsx';

/**
 * N'apparaît que lorsque le moteur détermine que cette prise de vue précise
 * bénéficierait vraiment d'un trépied (pose longue, filé trop lent à main levée...)
 * ET que l'utilisateur en a un dans son profil matériel.
 */
export function TripodPrompt({ reason, onAnswer }) {
  return (
    <div className="flex flex-col gap-5 animate-fade-slide-in">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Un trépied ferait la différence ici</h2>
        <p className="text-sm text-neutral-500">{reason} L'as-tu sur toi pour cette prise ?</p>
      </div>
      <StepTripodUsedNow value={null} onSelect={onAnswer} />
    </div>
  );
}
