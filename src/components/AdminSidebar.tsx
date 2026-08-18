'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

const menu = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Manajemen Konten', href: '/admin/konten' },
  { label: 'Galeri', href: '/admin/galeri' },
  { label: 'Kependudukan', href: '/admin/kependudukan' },
  { label: 'Statistik', href: '/admin/statistik' },
  { label: 'Template Surat', href: '/admin/surat/template' },
  { label: 'Proses Surat', href: '/admin/surat/proses' },
  { label: 'Arsip Surat', href: '/admin/surat/arsip' },
  { label: 'Cetak Massal', href: '/admin/surat/cetak-massal' },
  { label: 'Layanan Surat', href: '/admin/layanan-surat' },
  { label: 'Pengaduan', href: '/admin/pengaduan' },
  { label: 'Pengguna', href: '/admin/pengguna' },
  { label: 'Log Aktivitas', href: '/admin/log-aktivitas' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn('bg-[var(--color-primary-dark)] text-white min-h-screen flex flex-col transition-all duration-200', collapsed ? 'w-16' : 'w-64')}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
        {!collapsed && <span className="font-bold">SID Admin</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-white/10 rounded" aria-label="Toggle sidebar">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
              className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition', active ? 'bg-white/20 font-medium' : 'hover:bg-white/10')}>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link href="/" className="block text-sm text-gray-300 hover:text-white transition flex items-center gap-2">
          {!collapsed && 'Kembali ke Publik'}
        </Link>
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
}
