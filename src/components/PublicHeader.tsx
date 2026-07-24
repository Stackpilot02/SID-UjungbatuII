'use client';

import Link from 'next/link';
import { useState } from 'react';

const nav = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/desa/profil' },
  { label: 'Berita', href: '/desa/berita' },
  { label: 'Layanan', href: '/desa/layanan-surat' },
  { label: 'Pengaduan', href: '/desa/pengaduan' },
  { label: 'Kontak', href: '/desa/kontak' },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="mt-4 w-max pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2 flex items-center gap-1 shadow-[0_4px_24px_rgba(26,28,24,0.06)]">
          <Link href="/" className="text-sm font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)] px-2">
            SID
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-3 py-1.5 rounded-lg hover:bg-black/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] px-4 py-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]">
              Masuk
            </Link>
            <button className="lg:hidden p-2 pointer-events-auto relative w-8 h-8 flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu">
              <span className={`absolute h-[1.5px] w-5 bg-[var(--color-text)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'rotate-45 translate-y-0' : '-translate-y-[5px]'}`} />
              <span className={`absolute h-[1.5px] w-5 bg-[var(--color-text)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-[1.5px] w-5 bg-[var(--color-text)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? '-rotate-45 translate-y-0' : 'translate-y-[5px]'}`} />
            </button>
          </div>
        </nav>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 bg-white/90 backdrop-blur-3xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {nav.map((item, i) => (
              <Link key={item.href} href={item.href}
                className="text-2xl font-[family-name:var(--font-heading)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ animation: `menuFadeIn 0.5s ease-[cubic-bezier(0.32,0.72,0,1)] ${i * 0.08}s both` }}
                onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <style>{`@keyframes menuFadeIn { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }`}</style>
          </div>
        </div>
      )}
    </>
  );
}
