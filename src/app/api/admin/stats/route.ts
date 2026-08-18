import { success, error } from '@/lib/api-utils';
import { getStats, updateStats } from '@/lib/supabase-store';

function isNonNegativeInt(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function isValidLabelList(value: unknown): value is { name: string; count: number }[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      item &&
      typeof item.name === 'string' &&
      item.name.trim().length > 0 &&
      isNonNegativeInt(item.count)
  );
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const totalPopulation = body?.totalPopulation;
    const maleCount = body?.maleCount;
    const femaleCount = body?.femaleCount;
    const familyCardCount = body?.familyCardCount;

    if (!isNonNegativeInt(totalPopulation)) return error('Total penduduk wajib angka bulat >= 0');
    if (!isNonNegativeInt(maleCount)) return error('Jumlah laki-laki wajib angka bulat >= 0');
    if (!isNonNegativeInt(femaleCount)) return error('Jumlah perempuan wajib angka bulat >= 0');
    if (!isNonNegativeInt(familyCardCount)) return error('Jumlah kartu keluarga wajib angka bulat >= 0');

    if (maleCount + femaleCount !== totalPopulation) {
      return error('Jumlah laki-laki + perempuan harus sama dengan total penduduk');
    }
    if (familyCardCount > totalPopulation) {
      return error('Jumlah kartu keluarga tidak boleh melebihi total penduduk');
    }

    if (!isValidLabelList(body?.occupationStats)) return error('Data pekerjaan tidak valid');
    if (!isValidLabelList(body?.religionStats)) return error('Data agama tidak valid');

    const updated = await updateStats({
      totalPopulation,
      maleCount,
      femaleCount,
      familyCardCount,
      occupationStats: body.occupationStats.map((o: { name: string; count: number }) => ({ name: o.name.trim(), count: o.count })),
      religionStats: body.religionStats.map((r: { name: string; count: number }) => ({ name: r.name.trim(), count: r.count })),
    });

    return success(updated);
  } catch (err) {
    console.error('Simpan statistik gagal:', err);
    return error('Gagal menyimpan data statistik', 500);
  }
}

export async function GET() {
  try {
    const data = await getStats();
    return success(data);
  } catch (err) {
    console.error('Ambil statistik gagal:', err);
    return error('Gagal mengambil data statistik', 500);
  }
}