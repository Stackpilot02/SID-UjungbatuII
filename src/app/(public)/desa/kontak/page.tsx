import Card from '@/components/Card';
import { getVillageProfile } from '@/lib/supabase-store';

export const dynamic = 'force-dynamic';

export default async function KontakPage() {
  const v = await getVillageProfile();
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-8">Kontak & Jam Layanan</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-[22px] font-semibold mb-4">Informasi Kontak</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-text-muted)] mb-0.5">Alamat</dt>
                <dd className="font-medium">{v.address}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] mb-0.5">Telepon</dt>
                <dd className="font-medium">{v.phone}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] mb-0.5">Email</dt>
                <dd className="font-medium">{v.email}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] mb-0.5">Jam Layanan</dt>
                <dd className="font-medium">{v.workingHours}</dd>
              </div>
            </dl>
          </Card>
        </div>
        <div>
          <Card className="h-full" innerClassName="h-full flex flex-col">
            <h2 className="text-[22px] font-semibold mb-4">Peta Lokasi</h2>
            <div className="relative flex-1 min-h-[320px] rounded-xl overflow-hidden bg-[var(--color-primary-tint)]">
              {/* Peta embed OpenStreetMap — koordinat kantor desa (mock, lihat mock-data) */}
              <iframe
                title="Peta lokasi Desa Ujungbatu II"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${(v.mapLng ?? 0) - 0.015}%2C${(v.mapLat ?? 0) - 0.01}%2C${(v.mapLng ?? 0) + 0.015}%2C${(v.mapLat ?? 0) + 0.01}&layer=mapnik&marker=${v.mapLat ?? 0}%2C${v.mapLng ?? 0}`}
                className="w-full h-full absolute inset-0 border-0"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-3">
              Kantor Desa Ujungbatu II — {v.villageName}, {v.address}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
