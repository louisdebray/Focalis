import { useState } from 'react';
import { GearPage } from './pages/GearPage.jsx';
import { NewRecommendationPage } from './pages/NewRecommendationPage.jsx';
import { PresetsPage } from './pages/PresetsPage.jsx';
import { AppHeader } from './components/ui/AppHeader.jsx';
import { BottomNav } from './components/ui/BottomNav.jsx';
import { useGearProfile } from './hooks/useGearProfile.js';

export default function App() {
  const [tab, setTab] = useState('recommendation');
  const gear = useGearProfile();
  const [presetToLoad, setPresetToLoad] = useState(null);
  const [homeKey, setHomeKey] = useState(0);

  function handleUsePreset(preset) {
    setPresetToLoad(preset);
    setTab('recommendation');
  }

  function goHome() {
    setTab('recommendation');
    setPresetToLoad(null);
    setHomeKey((k) => k + 1);
  }

  return (
    <>
      <AppHeader onLogoClick={goHome} />
      <div key={tab} className="animate-fade-in" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 5rem)' }}>
        {tab === 'recommendation' && (
          <NewRecommendationPage
            key={homeKey}
            gearProfile={gear.profile}
            presetToLoad={presetToLoad}
            onPresetConsumed={() => setPresetToLoad(null)}
          />
        )}
        {tab === 'presets' && <PresetsPage gearProfile={gear.profile} onUsePreset={handleUsePreset} />}
        {tab === 'gear' && <GearPage />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </>
  );
}
