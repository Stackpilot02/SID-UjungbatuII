'use client';

import { useState, FormEvent } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, FieldError } from '@/components/form';

const statusSteps = [
  { key: 'pending', label: 'Diterima', desc: 'Pengajuan masuk dan menunggu verifikasi' },
  { key: 'verified', label: 'Terverifikasi', desc: 'Data telah diverifikasi operator desa' },
  { key: 'approved', label: 'Disetujui', desc: 'Pengajuan disetujui, surat sedang dibuat' },
  { key: 'completed', label: 'Selesai', desc: 'Surat terbit dan siap diunduh' },
];

export default function CekStatusSuratPage() {
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [request, setRequest] = useState<{
    id: string;
    letterTypeId: string;
    requesterName: string;
    purpose: string;
    status: string;
    createdAt: string;
  } | null>(null);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!ref.trim()) { setError('Masukkan nomor referensi'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/letter-requests/${ref.trim()}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Pengajuan tidak ditemukan');
      setRequest(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pengajuan tidak ditemukan');
      setRequest(null);
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = request ? statusSteps.findIndex((s) => s.key === request.status) : -1;
  const rejected = request?.status === 'rejected';

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <Button href="/desa/layanan-surat" variant="secondary" className="mb-6">&larr; Kembali</Button>
      <h1 className="text-[32px] font-bold mb-2">Cek Status Pengajuan</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Masukkan nomor referensi yang Anda terima saat mengajukan surat.
      </p>

      <Card className="mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Label>Nomor Referensi</Label>
            <Input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Contoh: LR-1234567890" />
            <FieldError message={error} />
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">{loading ? 'Mencari...' : 'Cek Status'}</Button>
        </form>
      </Card>

      {request && !rejected && (
        <Card>
          <div className="mb-6">
            <span className="text-xs font-mono-data text-[var(--color-primary)] font-bold">{request.id}</span>
            <h2 className="text-xl font-semibold mt-1">{request.requesterName}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{request.purpose}</p>
          </div>
          <div className="space-y-0">
            {statusSteps.map((step, i) => {
              const done = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg)] text-[var(--color-text-muted)]'}`}>
                      {done ? '✓' : i + 1}
                    </div>
                    {i < statusSteps.length - 1 && <div className={`w-[2px] flex-1 min-h-8 ${done ? 'bg-[var(--color-primary)]/40' : 'bg-[var(--color-border)]'}`} />}
                  </div>
                  <div className={`pb-6 ${isCurrent ? '' : ''}`}>
                    <p className={`font-medium ${done ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>{step.label}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {request && rejected && (
        <Card>
          <div className="w-12 h-12 rounded-full bg-[var(--color-danger)]/10 text-[var(--color-danger)] flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Pengajuan Ditolak</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Hubungi kantor desa untuk informasi lebih lanjut terkait penolakan pengajuan Anda.</p>
        </Card>
      )}
    </div>
  );
}