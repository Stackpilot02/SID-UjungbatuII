import { success, error } from '@/lib/api-utils';
import { users, addUser } from '@/data/mock-data';
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