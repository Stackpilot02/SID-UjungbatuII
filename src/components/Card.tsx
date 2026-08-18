import { cn } from '@/lib/utils';

export default function Card({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn('bg-black/[0.03] p-[1px] rounded-[1.5rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_12px_40px_rgba(27,30,28,0.06)]', className)}>
      <div className={cn('bg-[var(--color-surface)] rounded-[calc(1.5rem-1px)] p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]', innerClassName)}>
        {children}
      </div>
    </div>
  );
}