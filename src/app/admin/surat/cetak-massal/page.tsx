'use client';

import { useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { pdf } from '@react-pdf/renderer';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Textarea, Select } from '@/components/form';
import { letterTypes } from '@/data/mock-data';

const LetterPDF = dynamic(() => import('@/components/LetterPDF').then(m => ({ default: m.LetterPDF })), { ssr: false });

export default function AdminCetakMassalPage() {
  const [letterTypeId, setLetterTypeId] = useState('');
  const [niks, setNiks] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<{ name: string; nik: string; number: string }[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setResults([]);

    if (!letterTypeId) { setError('Pilih jenis surat'); return; }
    const nikList = niks.split(',').map(s => s.trim()).filter(Boolean);
    if (nikList.length === 0) { setError('Masukkan minimal 1 NIK'); return; }

    setLoading(true);

    const res = await fetch('/api/admin/residents');
    const json = await res.json();
    const allResidents: Array<{ nik: string; fullName: string; dusun: string }> = json.success ? json.data : [];
    const residents = allResidents.filter(r => nikList.includes(r.nik));

    if (residents.length === 0) { setError('NIK tidak ditemukan di database'); setLoading(false); return; }

    const resultsArr: { name: string; nik: string; number: string }[] = [];

    for (const resident of residents) {
      const res2 = await fetch('/api/admin/letters/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter_type_id: letterTypeId, resident_id: resident.nik }),
      });
      const genJson = await res2.json();
      if (genJson.success) {
        resultsArr.push({ name: resident.fullName, nik: resident.nik, number: genJson.data.letter_number });
      }
    }

    setResults(resultsArr);

    if (resultsArr.length > 0) {
      const pdfDoc = (
        <LetterPDF
          letterNumber={resultsArr[0].number}
          residentName={resultsArr[0].name}
          residentNIK={resultsArr[0].nik}
          residentAddress={residents[0]?.dusun || '-'}
          purpose="administrasi"
        />
      );
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `surat_${resultsArr[0].nik}_${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }

    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Cetak Massal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Generate Banyak Surat</h2>
          {error && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-xl px-4 py-3 mb-5">{error}</p>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label>Jenis Surat</Label>
              <Select value={letterTypeId} onChange={(e) => setLetterTypeId(e.target.value)} required>
                <option value="">Pilih jenis surat</option>
                {letterTypes.map((lt) => <option key={lt.id} value={lt.id}>{lt.name} ({lt.code})</option>)}
              </Select>
            </div>
            <div>
              <Label>Data Penduduk (copy-paste NIK, pisahkan dengan koma)</Label>
              <Textarea value={niks} onChange={(e) => setNiks(e.target.value)} required className="min-h-[100px] font-mono-data text-xs" placeholder="1209123456789001, 1209123456789002, ..." />
            </div>
            <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Generate & Cetak'}</Button>
          </form>
        </Card>
        {results.length > 0 && (
          <Card>
            <h2 className="text-[22px] font-semibold mb-4">Hasil Generate</h2>
            <p className="text-sm text-[var(--color-success)] mb-3">Berhasil membuat {results.length} surat</p>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="text-sm border border-[var(--color-border)] rounded-lg px-3 py-2">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-[var(--color-text-muted)]">{r.nik} — {r.number}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
