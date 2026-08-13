import { useEffect, useMemo, useState } from 'react';
import { SituationWizard } from '../components/situation/SituationWizard.jsx';
import { RenderIntentPicker } from '../components/rendering/RenderIntentPicker.jsx';
import { RecommendationCard } from '../components/result/RecommendationCard.jsx';
import { PresetSuggestionBanner } from '../components/presets/PresetSuggestionBanner.jsx';
import { PresetForm } from '../components/presets/PresetForm.jsx';
import { Sheet } from '../components/ui/Sheet.jsx';
import { Button } from '../components/ui/Button.jsx';
import { IconCheck } from '../components/icons/Icons.jsx';
import { generateRecommendation } from '../domain/recommendation/ruleEngine.js';
import { findMatchingPreset } from '../domain/presets/presetMatcher.js';
import { createPreset } from '../domain/presets/presetTypes.js';
import { usePresets } from '../hooks/usePresets.js';

export function NewRecommendationPage({ gearProfile, presetToLoad, onPresetConsumed }) {
  const [situation, setSituation] = useState(null);
  const [renderIntent, setRenderIntent] = useState(null);
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const { presets, addPreset } = usePresets();

  useEffect(() => {
    if (presetToLoad) {
      setSituation(presetToLoad.situation);
      setRenderIntent(presetToLoad.renderIntent);
      setSuggestionDismissed(true);
      onPresetConsumed();
    }
  }, [presetToLoad, onPresetConsumed]);

  const matchedPreset = useMemo(() => {
    if (!situation || renderIntent || suggestionDismissed) return null;
    return findMatchingPreset(situation, presets);
  }, [situation, renderIntent, suggestionDismissed, presets]);

  function reset() {
    setSituation(null);
    setRenderIntent(null);
    setSuggestionDismissed(false);
    setJustSaved(false);
  }

  function useMatchedPreset() {
    setRenderIntent(matchedPreset.renderIntent);
    setSuggestionDismissed(true);
  }

  if (!situation) {
    return (
      <div className="mx-auto max-w-lg p-4 pb-24">
        <SituationWizard initialTripodAvailable={gearProfile.tripod.available} onComplete={setSituation} />
      </div>
    );
  }

  if (matchedPreset) {
    return (
      <div className="mx-auto max-w-lg p-4 pb-24">
        <PresetSuggestionBanner
          preset={matchedPreset}
          onUse={useMatchedPreset}
          onDismiss={() => setSuggestionDismissed(true)}
        />
      </div>
    );
  }

  if (!renderIntent) {
    return (
      <div className="mx-auto max-w-lg p-4 pb-24">
        <RenderIntentPicker onComplete={setRenderIntent} />
      </div>
    );
  }

  const recommendation = generateRecommendation({ gear: gearProfile, situation, renderIntent });

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 p-4 pb-24">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Ta recommandation</h1>
        <p className="text-sm text-neutral-500">Pour : {situation.subject}</p>
      </div>

      <RecommendationCard recommendation={recommendation} />

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={() => setShowSaveForm(true)}>
          Sauvegarder ce preset
        </Button>
        <Button variant="ghost" onClick={reset}>
          Nouvelle situation
        </Button>
      </div>

      {justSaved && (
        <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-accent-600">
          <IconCheck className="h-4 w-4" /> Preset enregistré
        </p>
      )}

      {showSaveForm && (
        <Sheet title="Sauvegarder ce preset" onClose={() => setShowSaveForm(false)}>
          <PresetForm
            onSave={({ name, note }) => {
              addPreset(createPreset({ name, situation, renderIntent, recommendation, note }));
              setShowSaveForm(false);
              setJustSaved(true);
            }}
            onCancel={() => setShowSaveForm(false)}
          />
        </Sheet>
      )}
    </div>
  );
}
