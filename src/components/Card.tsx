import { cn } from '@/lib/utils';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-5', className)}>
      {children}
    </div>
  );
}
