export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl border border-neutral-100 bg-white p-4 shadow-[0_2px_24px_-8px_rgba(22,22,26,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}
