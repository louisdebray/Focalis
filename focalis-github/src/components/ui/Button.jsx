const VARIANTS = {
  primary:
    'gradient-accent text-white shadow-[0_8px_20px_-6px_rgba(242,118,42,0.55)] active:shadow-[0_4px_10px_-4px_rgba(242,118,42,0.5)]',
  secondary: 'bg-neutral-100 text-neutral-800 active:bg-neutral-200',
  ghost: 'bg-transparent text-neutral-600 active:bg-neutral-100',
  danger: 'bg-transparent text-danger-500 active:bg-red-50',
};

export function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-medium transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
