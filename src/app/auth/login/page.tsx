'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-[28px] font-bold text-center mb-2">Masuk</h1>
        <p className="text-center text-sm text-[var(--color-text-muted)] mb-8">Masuk ke akun SID Ujungbatu II</p>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="contoh@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kata Sandi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="Masukkan kata sandi" />
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</Button>
        </form>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Belum punya akun?{' '}
          <a href="/auth/registrasi" className="text-[var(--color-primary)] font-medium hover:underline">Daftar</a>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/" className="text-[var(--color-text-muted)] hover:underline">&larr; Kembali ke Beranda</Link>
        </p>
      </Card>
    </div>
  );
}
