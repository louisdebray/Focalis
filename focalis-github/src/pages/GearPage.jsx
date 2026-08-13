import { useState } from 'react';
import { useGearProfile } from '../hooks/useGearProfile.js';
import { CameraForm } from '../components/gear/CameraForm.jsx';
import { CameraSummary } from '../components/gear/CameraSummary.jsx';
import { LensForm } from '../components/gear/LensForm.jsx';
import { LensList } from '../components/gear/LensList.jsx';
import { TripodSection } from '../components/gear/TripodSection.jsx';
import { Sheet } from '../components/ui/Sheet.jsx';
import { Button } from '../components/ui/Button.jsx';

export function GearPage() {
  const {
    profile,
    setCamera,
    removeCamera,
    addLens,
    updateLens,
    removeLens,
    setMountedLens,
    setTripod,
  } = useGearProfile();

  const [editingCamera, setEditingCamera] = useState(false);
  const [editingLens, setEditingLens] = useState(null); // null | 'new' | Lens

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 p-4 pb-24">
      <header>
        <h1 className="text-2xl font-semibold text-neutral-900">Mon matériel</h1>
        <p className="text-sm text-neutral-500">Boîtier, objectifs et accessoires disponibles.</p>
      </header>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-neutral-800">Boîtier</h2>
          {!profile.camera && (
            <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => setEditingCamera(true)}>
              + Ajouter
            </Button>
          )}
        </div>
        {profile.camera ? (
          <CameraSummary
            camera={profile.camera}
            onEdit={() => setEditingCamera(true)}
            onRemove={removeCamera}
          />
        ) : (
          <p className="text-sm text-neutral-400">Aucun boîtier enregistré.</p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-neutral-800">Objectifs</h2>
          <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => setEditingLens('new')}>
            + Ajouter
          </Button>
        </div>
        <LensList
          lenses={profile.lenses}
          onEdit={setEditingLens}
          onRemove={removeLens}
          onMount={setMountedLens}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-neutral-800">Trépied</h2>
        <TripodSection tripod={profile.tripod} onChange={setTripod} />
      </section>

      {editingCamera && (
        <Sheet title={profile.camera ? 'Modifier le boîtier' : 'Ajouter un boîtier'} onClose={() => setEditingCamera(false)}>
          <CameraForm
            initialCamera={profile.camera}
            onSave={(camera) => {
              setCamera(camera);
              setEditingCamera(false);
            }}
            onCancel={() => setEditingCamera(false)}
          />
        </Sheet>
      )}

      {editingLens && (
        <Sheet
          title={editingLens === 'new' ? 'Ajouter un objectif' : 'Modifier l’objectif'}
          onClose={() => setEditingLens(null)}
        >
          <LensForm
            initialLens={editingLens === 'new' ? null : editingLens}
            onSave={(lens) => {
              if (editingLens === 'new') addLens(lens);
              else updateLens(lens.id, lens);
              setEditingLens(null);
            }}
            onCancel={() => setEditingLens(null)}
          />
        </Sheet>
      )}
    </div>
  );
}
