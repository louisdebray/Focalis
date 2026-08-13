export function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {hint && <span className="text-xs text-neutral-400">{hint}</span>}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-[15px] text-neutral-900 outline-none transition-shadow focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
      {...props}
    />
  );
}

export function NumberInput(props) {
  return <TextInput type="number" inputMode="decimal" {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select
      className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-[15px] text-neutral-900 outline-none transition-shadow focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
      {...props}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-left"
    >
      <span className="text-[15px] text-neutral-800">{label}</span>
      <span
        className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-accent-500' : 'bg-neutral-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </span>
    </button>
  );
}
