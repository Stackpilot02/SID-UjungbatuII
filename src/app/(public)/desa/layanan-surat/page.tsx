import Card from '@/components/Card';
import Button from '@/components/Button';
import { letterTypes } from '@/data/mock-data';

export default function LayananSuratPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-4">Layanan Surat Online</h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-2xl">
        Ajukan surat keterangan dan layanan administrasi desa secara online. Pilih jenis surat, isi data, dan lacak status pengajuan Anda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {letterTypes.map((lt) => (
          <Card key={lt.id} className="flex flex-col">
            <h3 className="font-semibold text-lg mb-1">{lt.name}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-mono-data">{lt.code}</p>
            {lt.requiresAttachment && <p className="text-xs text-[var(--color-accent-clay)] mb-4">* Perlu lampiran</p>}
            <div className="mt-auto pt-4">
              <Button href={`/desa/layanan-surat/ajukan?letterTypeId=${lt.id}`} variant="primary" className="w-full text-sm">Ajukan</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <Card className="bg-[var(--color-primary-tint)] border-0 flex-1">
          <h2 className="text-[22px] font-semibold mb-3">Cara Mengajukan Surat</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--color-text-muted)]">
            <li>Pilih jenis surat yang dibutuhkan</li>
            <li>Isi form pengajuan dan unggah dokumen pendukung (jika diperlukan)</li>
            <li>Simpan nomor referensi yang diberikan</li>
            <li>Tunggu verifikasi dari operator desa</li>
            <li>Setelah disetujui, unduh surat dalam format PDF</li>
          </ol>
        </Card>
        <Card className="flex flex-col justify-center flex-1">
          <h2 className="text-[22px] font-semibold mb-2">Sudah Mengajukan?</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">
            Lacak status pengajuan surat Anda dengan nomor referensi yang diterima saat mengajukan.
          </p>
          <Button href="/desa/layanan-surat/status" variant="secondary" className="self-start">Cek Status Pengajuan</Button>
        </Card>
      </div>
    </div>
  );
}
