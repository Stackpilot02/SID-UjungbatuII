import Card from '@/components/Card';
import { villageProfile } from '@/data/mock-data';

export default function KontakPage() {
  const v = villageProfile;
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
          <Card className="h-full">
            <h2 className="text-[22px] font-semibold mb-4">Peta Lokasi</h2>
            <div className="aspect-video bg-[var(--color-primary-tint)] rounded-lg flex items-center justify-center text-[var(--color-text-muted)]">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <p>Peta akan ditampilkan di sini</p>
                <p className="text-xs mt-1">(Integrasi Google Maps/OpenStreetMap)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
