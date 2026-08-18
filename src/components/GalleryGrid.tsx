'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--color-text-muted)] bg-black/[0.02] rounded-[1.75rem]">
        <p className="font-medium">Belum ada foto kegiatan</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => setSelected(item)} className="text-left group cursor-pointer">
            <div className="bg-black/[0.03] p-[1px] rounded-[1.75rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(26,28,24,0.12)] group-hover:translate-y-[-2px]">
              <div className="bg-[var(--color-surface)] rounded-[calc(1.75rem-1px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-primary-dark)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.mediaUrl || '/hero-desa.png'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">{item.description}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">{formatDate(item.eventDate)}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-3xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.mediaUrl || '/hero-desa.png'}
              alt={selected.title}
              className="w-full rounded-2xl shadow-2xl max-h-[70vh] object-contain"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="font-semibold text-lg">{selected.title}</h3>
              <p className="text-sm text-white/70 mt-1">{selected.description}</p>
              <p className="text-xs text-white/50 mt-1">{formatDate(selected.eventDate)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}