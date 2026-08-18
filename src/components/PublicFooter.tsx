export default function PublicFooter() {
  return (
    <footer className="border-t border-black/[0.06] mt-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-base font-bold mb-3 text-[var(--color-primary)]">
              SID<span className="text-[var(--color-accent-gold)]">.</span>Ujungbatu II
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Sistem Informasi Desa — Meningkatkan transparansi dan efisiensi pelayanan publik.
            </p>
          </div>
          <div>
            <h4 className="text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-4 font-medium">Kontak</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-2">
              <li>Kantor Desa Ujungbatu II</li>
              <li>Kec. Hutaraja Tinggi, Kab. Padang Lawas</li>
              <li>Sumatera Utara</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-4 font-medium">Jam Layanan</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-2">
              <li>Senin - Jumat</li>
              <li>08:00 - 16:00 WIB</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black/[0.06] mt-10 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
          <span>&copy; {new Date().getFullYear()} Pemerintah Desa Ujungbatu II</span>
          <span>Sistem Informasi Desa</span>
        </div>
      </div>
    </footer>
  );
}