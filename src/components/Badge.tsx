import { cn } from '@/lib/utils';

export default function Badge({ children, variant = 'default', className }: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}) {
  const classes: Record<string, string> = {
    default: 'bg-black/[0.04] text-[var(--color-text-muted)]',
    success: 'bg-[var(--color-primary-tint)] text-[var(--color-success)]',
    warning: 'bg-[#FBF3DC] text-[var(--color-primary-dark)]',
    danger: 'bg-[#F7E4E1] text-[var(--color-danger)]',
  };
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ring-black/[0.04]', classes[variant], className)}>
      {children}
    </span>
  );
}