import { useState } from 'react';
import {
  DEPTH_OF_FIELD_OPTIONS,
  MOTION_RENDERING_OPTIONS,
  MOOD_OPTIONS,
  CONTROL_STYLE_OPTIONS,
  createEmptyRenderIntent,
  isRenderIntentComplete,
} from '../../domain/rendering/renderIntents.js';
import { OptionCard, OptionGrid } from '../ui/OptionCard.jsx';
import { Button } from '../ui/Button.jsx';

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-base font-medium text-neutral-800">{title}</h3>
      {children}
    </section>
  );
}

export function RenderIntentPicker({ onComplete }) {
  const [renderIntent, setRenderIntent] = useState(createEmptyRenderIntent());

  function set(key, value) {
    setRenderIntent((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Quel rendu recherches-tu ?</h2>
        <p className="text-sm text-neutral-500">Ces choix orientent l'ouverture, la vitesse et le style de prise de vue.</p>
      </div>

      <Section title="Profondeur de champ">
        <OptionGrid columns={2}>
          {DEPTH_OF_FIELD_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={renderIntent.depthOfField === option.value}
              onClick={() => set('depthOfField', option.value)}
            />
          ))}
        </OptionGrid>
      </Section>

      <Section title="Rendu du mouvement">
        <OptionGrid columns={2}>
          {MOTION_RENDERING_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={renderIntent.motionRendering === option.value}
              onClick={() => set('motionRendering', option.value)}
            />
          ))}
        </OptionGrid>
      </Section>

      <Section title="Ambiance">
        <OptionGrid columns={2}>
          {MOOD_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={renderIntent.mood === option.value}
              onClick={() => set('mood', option.value)}
            />
          ))}
        </OptionGrid>
      </Section>

      <Section title="Style de prise de vue">
        <OptionGrid columns={2}>
          {CONTROL_STYLE_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={renderIntent.controlStyle === option.value}
              onClick={() => set('controlStyle', option.value)}
            />
          ))}
        </OptionGrid>
      </Section>

      <Button onClick={() => onComplete(renderIntent)} disabled={!isRenderIntentComplete(renderIntent)}>
        Voir ma recommandation
      </Button>
    </div>
  );
}
