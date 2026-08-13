import { useState } from 'react';
import { usePresets } from '../hooks/usePresets.js';
import { PresetList } from '../components/presets/PresetList.jsx';
import { ManualPresetForm } from '../components/presets/ManualPresetForm.jsx';
import { Sheet } from '../components/ui/Sheet.jsx';
import { Button } from '../components/ui/Button.jsx';
import { createPreset } from '../domain/presets/presetTypes.js';

export function PresetsPage({ gearProfile, onUsePreset }) {
  const { presets, addPreset, updatePreset, removePreset } = usePresets();
  const [showManualForm, setShowManualForm] = useState(false);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 p-4 pb-24">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Mes presets</h1>
          <p className="text-sm text-neutral-500">Retrouve les réglages qui ont fait leurs preuves.</p>
        </div>
        <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => setShowManualForm(true)}>
          + Ajouter
        </Button>
      </header>

      <PresetList
        presets={presets}
        onRate={(id, rating) => updatePreset(id, { rating })}
        onRemove={removePreset}
        onUse={onUsePreset}
      />

      {showManualForm && (
        <Sheet title="Ajouter un preset trouvé sur le terrain" onClose={() => setShowManualForm(false)}>
          <ManualPresetForm
            gearLenses={gearProfile.lenses}
            onSave={(data) => {
              addPreset(createPreset(data));
              setShowManualForm(false);
            }}
            onCancel={() => setShowManualForm(false)}
          />
        </Sheet>
      )}
    </div>
  );
}
