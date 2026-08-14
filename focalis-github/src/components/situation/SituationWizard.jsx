import { useState } from 'react';
import { createEmptySituation } from '../../domain/situation/situationTypes.js';
import { getRelevantSteps } from '../../domain/situation/situationSchema.js';
import { StepPhotoType } from './StepPhotoType.jsx';
import { StepSubject } from './StepSubject.jsx';
import { StepDistance } from './StepDistance.jsx';
import { StepMovement } from './StepMovement.jsx';
import { StepLight } from './StepLight.jsx';
import { StepObstacles } from './StepObstacles.jsx';
import { Button } from '../ui/Button.jsx';

const STEP_TITLES = {
  photoType: 'Quel type de photo ?',
  subject: 'Quel est ton sujet ?',
  distance: 'À quelle distance ?',
  movement: 'Le sujet bouge-t-il ?',
  light: 'Quelle lumière ?',
  obstacles: 'Des contraintes particulières ?',
};

export function SituationWizard({ onComplete }) {
  const [situation, setSituation] = useState(() => createEmptySituation());
  const [stepIndex, setStepIndex] = useState(0);

  const steps = getRelevantSteps(situation);
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  function goNext() {
    if (isLastStep) {
      onComplete(situation);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function selectAndAdvance(patch) {
    const nextSituation = { ...situation, ...patch };
    const nextSteps = getRelevantSteps(nextSituation);
    setSituation(nextSituation);
    if (stepIndex >= nextSteps.length - 1) {
      onComplete(nextSituation);
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        {stepIndex > 0 && (
          <button onClick={goBack} className="p-1 text-neutral-400" aria-label="Retour">
            ←
          </button>
        )}
        <div className="flex flex-1 gap-1">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? 'gradient-accent' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div key={currentStep} className="flex flex-col gap-5 animate-fade-slide-in">
      <h2 className="text-xl font-semibold text-neutral-900">{STEP_TITLES[currentStep]}</h2>

      {currentStep === 'photoType' && (
        <StepPhotoType value={situation.photoType} onSelect={(photoType) => selectAndAdvance({ photoType })} />
      )}

      {currentStep === 'subject' && (
        <StepSubject
          photoType={situation.photoType}
          value={situation.subject}
          onChange={(subject) => setSituation((prev) => ({ ...prev, subject }))}
          onContinue={goNext}
        />
      )}

      {currentStep === 'distance' && (
        <StepDistance
          value={situation.distance}
          onChange={(distance) => setSituation((prev) => ({ ...prev, distance }))}
          onSelectCategory={(category) =>
            setSituation((prev) => ({ ...prev, distance: { ...prev.distance, category } }))
          }
        />
      )}
      {currentStep === 'distance' && (
        <Button onClick={goNext} disabled={!situation.distance.category}>
          Continuer
        </Button>
      )}

      {currentStep === 'movement' && (
        <StepMovement value={situation.movement} onSelect={(movement) => selectAndAdvance({ movement })} />
      )}

      {currentStep === 'light' && (
        <StepLight value={situation.light} onSelect={(light) => selectAndAdvance({ light })} />
      )}

      {currentStep === 'obstacles' && (
        <StepObstacles
          value={situation.obstacles}
          onChange={(obstacles) => setSituation((prev) => ({ ...prev, obstacles }))}
          onContinue={goNext}
        />
      )}
      </div>
    </div>
  );
}
