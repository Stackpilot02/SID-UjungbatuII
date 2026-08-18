import { success, error } from '@/lib/api-utils';
import {
  getUsers,
  addUser,
  updateUser,
  isEmailTaken,
} from '@/lib/supabase-store';
import { isValidEmail } from '@/lib/validation';

const roles = ['warga', 'operator', 'admin', 'kepala_desa'];

export async function GET() {
  try {
    const data = await getUsers();
    return success(data);
  } catch (err) {
    console.error('Ambil pengguna gagal:', err);
    return error('Gagal mengambil data pengguna', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, role } = body ?? {};

    if (!fullName?.trim()) return error('Nama lengkap wajib diisi');
    if (!isValidEmail(email ?? '')) return error('Format email tidak valid');
    if (await isEmailTaken(email)) return error('Email sudah terdaftar');
    if (!roles.includes(role)) return error('Role tidak valid');

    const record = await addUser({
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

    const body = await request.json();
    const { fullName, email, role } = body ?? {};

    if (fullName !== undefined && !fullName.trim()) return error('Nama lengkap wajib diisi');
    if (email !== undefined) {
      if (!isValidEmail(email)) return error('Format email tidak valid');
      if (await isEmailTaken(email, id)) return error('Email sudah terdaftar');
    }
    if (role !== undefined && !roles.includes(role)) return error('Role tidak valid');

    const patch: Record<string, unknown> = {};
    if (fullName !== undefined) patch.fullName = fullName.trim();
    if (email !== undefined) patch.email = email.trim();
    if (role !== undefined) patch.role = role;

    const record = await updateUser(id, patch);
    if (!record) return error('Pengguna tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui pengguna gagal:', err);
    return error('Gagal memperbarui pengguna', 500);
  }
}