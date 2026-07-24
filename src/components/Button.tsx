import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'accent' | 'danger';

export default function Button({
  children, variant = 'primary', href, className, ...props
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
    secondary: 'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-tint)]',
    accent: 'bg-[var(--color-accent-clay)] text-white hover:opacity-90',
    danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
  };

  if (href) {
    return <a href={href} className={cn(base, variants[variant], className)}>{children}</a>;
  }
  return <button className={cn(base, variants[variant], className)} {...props}>{children}</button>;
}
