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
  const base = 'group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full font-medium text-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
    secondary: 'border border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-tint)]',
    accent: 'bg-[var(--color-accent-clay)] text-white hover:opacity-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
    danger: 'bg-[var(--color-danger)] text-white hover:opacity-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
  };

  if (href) {
    return <a href={href} className={cn(base, variants[variant], className)}>{children}</a>;
  }
  return <button className={cn(base, variants[variant], className)} {...props}>{children}</button>;
}