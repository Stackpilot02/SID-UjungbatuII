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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav className="mt-4 w-max pointer-events-auto bg-white/85 backdrop-blur-2xl border border-black/[0.06] rounded-full p-1.5 flex items-center gap-1 shadow-[0_8px_32px_rgba(27,30,28,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)]">
          <Link href="/" className="text-sm font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)] px-4 py-1.5">
            SID<span className="text-[var(--color-accent-gold)]">.</span>Ujungbatu II
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-3 py-1.5 rounded-full hover:bg-black/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Link href="/auth/login" className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] pl-5 pr-1.5 py-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              Masuk
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
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