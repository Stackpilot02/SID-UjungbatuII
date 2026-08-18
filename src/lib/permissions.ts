// Modul permission RBAC — sesuai rules.md §2 & prd.md §11
import { UserRole } from './types';

export type Permission =
  | 'ajukan_surat'
  | 'ajukan_pengaduan'
  | 'lihat_status_pengajuan'
  | 'verifikasi_surat'
  | 'approve_surat'
  | 'generate_surat'
  | 'cetak_massal'
  | 'kelola_template'
  | 'crud_penduduk'
  | 'kelola_pengguna'
  | 'lihat_log'
  | 'lihat_dashboard';

export const PERMISSION_MATRIX: Record<Permission, UserRole[]> = {
  ajukan_surat: ['warga'],
  ajukan_pengaduan: ['warga'],
  lihat_status_pengajuan: ['warga'],
  verifikasi_surat: ['operator', 'admin'],
  approve_surat: ['admin'],
  generate_surat: ['operator', 'admin'],
  cetak_massal: ['admin'],
  kelola_template: ['admin'],
  crud_penduduk: ['operator', 'admin'],
  kelola_pengguna: ['admin'],
  lihat_log: ['admin'],
  lihat_dashboard: ['operator', 'admin', 'kepala_desa'],
};

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return PERMISSION_MATRIX[permission]?.includes(role) ?? false;
}

// Aturan eskalasi: operator tidak boleh menyetujui pengajuan suratnya sendiri (segregation of duties).
export function canApproveLetter(
  role: UserRole,
  approverId: string,
  requesterId: string
): boolean {
  if (role !== 'admin') return false;
  return approverId !== requesterId;
}