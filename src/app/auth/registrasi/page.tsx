'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input } from '@/components/form';
import { createClient } from '@/lib/supabase';

export default function RegistrasiPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak sesuai');
      return;
    }

    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter');
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, phone },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)]">
        <Card className="w-full max-w-md text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold mb-2">Pendaftaran Berhasil</h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            Silakan periksa email <strong>{email}</strong> untuk verifikasi akun Anda.
          </p>
          <Button variant="primary" href="/auth/login">Masuk</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[var(--color-bg)]">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary-tint)] rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold text-[var(--color-primary)] tracking-[0.15em] uppercase">SID Ujungbatu II</span>
          </div>
          <h1 className="text-[28px] font-bold">Daftar Akun</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Daftar untuk mengakses layanan desa</p>
        </div>
        {error && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-xl px-4 py-3 mb-5">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama sesuai KTP" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="contoh@email.com" />
          </div>
          <div>
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Kata Sandi</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="Min. 8 karakter" />
            </div>
            <div>
              <Label htmlFor="confirm">Konfirmasi</Label>
              <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Ulangi sandi" />
            </div>
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Daftar'}</Button>
        </form>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-[var(--color-primary)] font-medium hover:underline">Masuk</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/" className="text-[var(--color-text-muted)] hover:underline">&larr; Kembali ke Beranda</Link>
        </p>
      </Card>
    </div>
  );
}