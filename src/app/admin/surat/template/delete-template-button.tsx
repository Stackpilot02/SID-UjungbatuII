'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteTemplateButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/letter-templates?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Hapus gagal');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hapus gagal');
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-sm">
        <button onClick={handleDelete} disabled={deleting} className="text-[var(--color-danger)] font-medium hover:underline">
          {deleting ? 'Menghapus...' : 'Ya, hapus'}
        </button>
        <button onClick={() => { setConfirming(false); setError(''); }} className="text-[var(--color-text-muted)] hover:underline">
          Batal
        </button>
        {error && <span className="text-[var(--color-danger)]">{error}</span>}
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-[var(--color-danger)] hover:underline text-sm" title={`Hapus ${name}`}>
      Hapus
    </button>
  );
}