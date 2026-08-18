'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input } from '@/components/form';
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)]">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary-tint)] rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold text-[var(--color-primary)] tracking-[0.15em] uppercase">SID Ujungbatu II</span>
          </div>
          <h1 className="text-[28px] font-bold">Masuk</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Masuk ke akun SID untuk mengakses layanan & panel admin</p>
        </div>
        {error && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-xl px-4 py-3 mb-5">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="contoh@email.com" />
          </div>
          <div>
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Masukkan kata sandi" />
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</Button>
        </form>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Belum punya akun?{' '}
          <Link href="/auth/registrasi" className="text-[var(--color-primary)] font-medium hover:underline">Daftar</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/" className="text-[var(--color-text-muted)] hover:underline">&larr; Kembali ke Beranda</Link>
        </p>
      </Card>
    </div>
  );
}