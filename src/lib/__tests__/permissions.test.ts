import { describe, it, expect } from 'vitest';
import { hasPermission, canApproveLetter } from '../permissions';

describe('hasPermission', () => {
  it('warga hanya dapat mengajukan & melihat status sendiri', () => {
    expect(hasPermission('warga', 'ajukan_surat')).toBe(true);
    expect(hasPermission('warga', 'ajukan_pengaduan')).toBe(true);
    expect(hasPermission('warga', 'lihat_status_pengajuan')).toBe(true);
    expect(hasPermission('warga', 'generate_surat')).toBe(false);
    expect(hasPermission('warga', 'kelola_template')).toBe(false);
  });

  it('operator dapat verifikasi & generate, tapi tidak approve/cetak massal', () => {
    expect(hasPermission('operator', 'verifikasi_surat')).toBe(true);
    expect(hasPermission('operator', 'generate_surat')).toBe(true);
    expect(hasPermission('operator', 'approve_surat')).toBe(false);
    expect(hasPermission('operator', 'cetak_massal')).toBe(false);
    expect(hasPermission('operator', 'kelola_template')).toBe(false);
    expect(hasPermission('operator', 'kelola_pengguna')).toBe(false);
  });

  it('admin memiliki akses penuh', () => {
    expect(hasPermission('admin', 'approve_surat')).toBe(true);
    expect(hasPermission('admin', 'cetak_massal')).toBe(true);
    expect(hasPermission('admin', 'kelola_template')).toBe(true);
    expect(hasPermission('admin', 'kelola_pengguna')).toBe(true);
    expect(hasPermission('admin', 'lihat_log')).toBe(true);
  });

  it('kepala desa hanya melihat dashboard (read-only)', () => {
    expect(hasPermission('kepala_desa', 'lihat_dashboard')).toBe(true);
    expect(hasPermission('kepala_desa', 'kelola_template')).toBe(false);
    expect(hasPermission('kepala_desa', 'approve_surat')).toBe(false);
    expect(hasPermission('kepala_desa', 'kelola_pengguna')).toBe(false);
  });

  it('role null/undefined tidak memiliki akses', () => {
    expect(hasPermission(null, 'lihat_dashboard')).toBe(false);
    expect(hasPermission(undefined, 'lihat_dashboard')).toBe(false);
  });
});

describe('canApproveLetter (segregation of duties)', () => {
  it('hanya admin yang dapat approve', () => {
    expect(canApproveLetter('admin', 'u1', 'u2')).toBe(true);
    expect(canApproveLetter('operator', 'u1', 'u2')).toBe(false);
  });

  it('admin tidak dapat menyetujui pengajuan atas nama dirinya sendiri', () => {
    expect(canApproveLetter('admin', 'u1', 'u1')).toBe(false);
  });
});