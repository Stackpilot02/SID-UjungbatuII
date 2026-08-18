import { success, error } from '@/lib/api-utils';
import {
  getResidents,
  addResident,
  updateResident,
  deleteResident,
  isNikTaken,
} from '@/lib/supabase-store';
import { isValidNik, isValidKkNumber, isNotFutureDate } from '@/lib/validation';

const genderOptions = ['Laki-laki', 'Perempuan'];

export async function GET() {
  try {
    const data = await getResidents();
    return success(data);
  } catch (err) {
    console.error('Ambil penduduk gagal:', err);
    return error('Gagal mengambil data penduduk', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nik, kkNumber, fullName, birthPlace, birthDate,
      gender, occupation, religion, maritalStatus, familyRole,
    } = body ?? {};

    if (!isValidNik(nik ?? '')) return error('NIK wajib 16 digit angka');
    if (await isNikTaken(nik)) return error('NIK sudah terdaftar');
    if (!isValidKkNumber(kkNumber ?? '')) return error('Nomor KK wajib 16 digit angka');
    if (!fullName?.trim()) return error('Nama lengkap wajib diisi');
    if (!birthPlace?.trim()) return error('Tempat lahir wajib diisi');
    if (!birthDate || !isNotFutureDate(birthDate)) return error('Tanggal lahir tidak valid');
    if (!genderOptions.includes(gender)) return error('Jenis kelamin tidak valid');
    if (!occupation?.trim()) return error('Pekerjaan wajib diisi');

    const record = await addResident({
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

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const body = await request.json();
    const { nik, kkNumber, fullName, birthPlace, birthDate, gender, occupation, religion, maritalStatus, familyRole } = body ?? {};

    if (nik !== undefined) {
      if (!isValidNik(nik)) return error('NIK wajib 16 digit angka');
      if (await isNikTaken(nik, id)) return error('NIK sudah terdaftar');
    }
    if (kkNumber !== undefined && !isValidKkNumber(kkNumber)) return error('Nomor KK wajib 16 digit angka');
    if (fullName !== undefined && !fullName.trim()) return error('Nama lengkap wajib diisi');
    if (birthPlace !== undefined && !birthPlace.trim()) return error('Tempat lahir wajib diisi');
    if (birthDate !== undefined && (!birthDate || !isNotFutureDate(birthDate))) return error('Tanggal lahir tidak valid');
    if (gender !== undefined && !genderOptions.includes(gender)) return error('Jenis kelamin tidak valid');
    if (occupation !== undefined && !occupation.trim()) return error('Pekerjaan wajib diisi');

    const patch: Record<string, unknown> = {};
    if (nik !== undefined) patch.nik = nik.trim();
    if (kkNumber !== undefined) patch.kkNumber = kkNumber.trim();
    if (fullName !== undefined) patch.fullName = fullName.trim();
    if (birthPlace !== undefined) patch.birthPlace = birthPlace.trim();
    if (birthDate !== undefined) patch.birthDate = birthDate;
    if (gender !== undefined) patch.gender = gender;
    if (occupation !== undefined) patch.occupation = occupation.trim();
    if (religion !== undefined) patch.religion = religion.trim();
    if (maritalStatus !== undefined) patch.maritalStatus = maritalStatus.trim();
    if (familyRole !== undefined) patch.familyRole = familyRole.trim();

    const record = await updateResident(id, patch);
    if (!record) return error('Penduduk tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui penduduk gagal:', err);
    return error('Gagal memperbarui data penduduk', 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const ok = await deleteResident(id);
    if (!ok) return error('Penduduk tidak ditemukan', 404);
    return success({ id, deleted: true });
  } catch (err) {
    console.error('Hapus penduduk gagal:', err);
    return error('Gagal menghapus data penduduk', 500);
  }
}