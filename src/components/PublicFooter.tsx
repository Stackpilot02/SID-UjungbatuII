export default function PublicFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold mb-3">SID Ujungbatu II</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Sistem Informasi Desa — Meningkatkan transparansi dan efisiensi pelayanan publik.
            </p>
          </div>
          <div>
            <h4 className="text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-3">Kontak</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
              <li>Kantor Desa Ujungbatu II</li>
              <li>Kec. Hutaraja Tinggi, Kab. Padang Lawas</li>
              <li>Sumatera Utara</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-3">Jam Layanan</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
              <li>Senin - Jumat</li>
              <li>08:00 - 16:00 WIB</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] mt-8 pt-6 text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Pemerintah Desa Ujungbatu II
        </div>
      </div>
    </footer>
  );
}
