import { success, error } from '@/lib/api-utils';
import { users, addUser, updateUser } from '@/data/mock-data';
import { isValidEmail } from '@/lib/validation';

const roles = ['warga', 'operator', 'admin', 'kepala_desa'];

export async function GET() {
  return success(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, role } = body ?? {};

    if (!fullName?.trim()) return error('Nama lengkap wajib diisi');
    if (!isValidEmail(email ?? '')) return error('Format email tidak valid');
    if (users.some((u) => u.email === email)) return error('Email sudah terdaftar');
    if (!roles.includes(role)) return error('Role tidak valid');

    const record = addUser({
      fullName: fullName.trim(),
      email: email.trim(),
      role,
    });

    return success(record, 201);
  } catch (err) {
    console.error('Simpan pengguna gagal:', err);
    return error('Gagal menyimpan pengguna', 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const existing = users.find((u) => u.id === id);
    if (!existing) return error('Pengguna tidak ditemukan', 404);

    const body = await request.json();
    const { fullName, email, role } = body ?? {};

    if (fullName !== undefined && !fullName.trim()) return error('Nama lengkap wajib diisi');
    if (email !== undefined) {
      if (!isValidEmail(email)) return error('Format email tidak valid');
      if (users.some((u) => u.email === email && u.id !== id)) return error('Email sudah terdaftar');
    }
    if (role !== undefined && !roles.includes(role)) return error('Role tidak valid');

    const patch: Record<string, unknown> = {};
    if (fullName !== undefined) patch.fullName = fullName.trim();
    if (email !== undefined) patch.email = email.trim();
    if (role !== undefined) patch.role = role;

    const record = updateUser(id, patch);
    return success(record);
  } catch (err) {
    console.error('Perbarui pengguna gagal:', err);
    return error('Gagal memperbarui pengguna', 500);
  }
}