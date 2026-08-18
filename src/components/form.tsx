export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">
      {children}
    </label>
  );
}

const fieldClass =
  'w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all duration-300';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={props.className ? `${props.className} ${fieldClass}` : fieldClass} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={props.className ? `${props.className} ${fieldClass}` : fieldClass} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={props.className ? `${props.className} ${fieldClass}` : fieldClass} />;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-[var(--color-danger)] mt-1">{message}</p>;
}