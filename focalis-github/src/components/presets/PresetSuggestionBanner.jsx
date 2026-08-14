import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { IconBookmark } from '../icons/Icons.jsx';

export function PresetSuggestionBanner({ preset, onUse, onDismiss }) {
  return (
    <Card className="flex flex-col gap-3 border-accent-300 bg-accent-50 text-left">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-white">
          <IconBookmark className="h-5 w-5" />
        </span>
        <div>
          <p className="font-medium text-neutral-900">Tu as déjà un preset pour ce type de situation</p>
          <p className="text-sm text-neutral-600">« {preset.name} » — l'utiliser directement ?</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" onClick={onUse}>
          Utiliser ce preset
        </Button>
        <Button variant="secondary" onClick={onDismiss}>
          Non merci
        </Button>
      </div>
    </Card>
  );
}
