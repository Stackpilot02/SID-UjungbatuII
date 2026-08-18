import { success, error } from '@/lib/api-utils';
import { getLetterRequests, addLetterRequest } from '@/lib/supabase-store';
import { isValidNik, isValidPhone, isValidEmail } from '@/lib/validation';

export async function GET() {
  try {
    const data = await getLetterRequests();
    return success(data);
  } catch (err) {
    console.error('Ambil pengajuan surat gagal:', err);
    return error('Gagal mengambil data pengajuan', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { letterTypeId, requesterName, requesterNik, phone, email, purpose, additionalData } = body ?? {};

    if (!letterTypeId) return error('Jenis surat wajib dipilih');
    if (!requesterName?.trim()) return error('Nama lengkap wajib diisi');
    if (!isValidNik(requesterNik ?? '')) return error('NIK wajib 16 digit angka');
    if (phone && !isValidPhone(phone)) return error('Format nomor telepon tidak valid');
    if (email && !isValidEmail(email)) return error('Format email tidak valid');
    if (!purpose?.trim()) return error('Keperluan surat wajib diisi');

    const record = await addLetterRequest({
      id: 'LR-' + Date.now(),
      letterTypeId,
      requesterName: requesterName.trim(),
      requesterNik: requesterNik.trim(),
      phone: (phone ?? '').trim(),
      email: (email ?? '').trim(),
      purpose: purpose.trim(),
      additionalData: additionalData ?? {},
    });

    return success(record, 201);
  } catch (err) {
    console.error('Simpan pengajuan surat gagal:', err);
    return error('Gagal menyimpan pengajuan', 500);
  }
}