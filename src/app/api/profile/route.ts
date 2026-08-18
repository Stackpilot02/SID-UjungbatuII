import { success, error } from '@/lib/api-utils';
import { getVillageProfile, getOrganizationStructure } from '@/lib/supabase-store';

export async function GET() {
  try {
    const [profile, structure] = await Promise.all([
      getVillageProfile(),
      getOrganizationStructure(),
    ]);
    return success({ profile, structure });
  } catch (err) {
    console.error('Ambil profil desa gagal:', err);
    return error('Gagal mengambil profil desa', 500);
  }
}