export function SettingBadge({ icon: IconComponent, label, value }) {
  return (
    <div className="gradient-dark flex flex-col items-center gap-1.5 rounded-2xl py-4 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-accent-400">
        <IconComponent className="h-5 w-5" />
      </span>
      <span className="text-xl font-semibold text-white">{value}</span>
      <span className="text-xs font-medium text-neutral-400">{label}</span>
    </div>
  );
}
