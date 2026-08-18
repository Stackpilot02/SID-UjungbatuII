import { success, error } from '@/lib/api-utils';
import { residents, addResident } from '@/data/mock-data';
import { isValidNik, isValidKkNumber, isNotFutureDate } from '@/lib/validation';

const genderOptions = ['Laki-laki', 'Perempuan'];

export async function GET() {
  return success(residents);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nik, kkNumber, fullName, birthPlace, birthDate,
      gender, occupation, religion, maritalStatus, familyRole,
    } = body ?? {};

    if (!isValidNik(nik ?? '')) return error('NIK wajib 16 digit angka');
    if (residents.some((r) => r.nik === nik)) return error('NIK sudah terdaftar');
    if (!isValidKkNumber(kkNumber ?? '')) return error('Nomor KK wajib 16 digit angka');
    if (!fullName?.trim()) return error('Nama lengkap wajib diisi');
    if (!birthPlace?.trim()) return error('Tempat lahir wajib diisi');
    if (!birthDate || !isNotFutureDate(birthDate)) return error('Tanggal lahir tidak valid');
    if (!genderOptions.includes(gender)) return error('Jenis kelamin tidak valid');
    if (!occupation?.trim()) return error('Pekerjaan wajib diisi');

    const record = addResident({
      nik: nik.trim(),
      kkNumber: kkNumber.trim(),
      fullName: fullName.trim(),
      birthPlace: birthPlace.trim(),
      birthDate,
      gender,
      occupation: occupation.trim(),
      religion: (religion ?? 'Islam').trim(),
      maritalStatus: (maritalStatus ?? 'Belum Kawin').trim(),
      familyRole: (familyRole ?? 'Anggota').trim(),
    });

    return success(record, 201);
  } catch (err) {
    console.error('Simpan penduduk gagal:', err);
    return error('Gagal menyimpan data penduduk', 500);
  }
}