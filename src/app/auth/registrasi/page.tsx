'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-[28px] font-bold text-center mb-2">Daftar Akun</h1>
        <p className="text-center text-sm text-[var(--color-text-muted)] mb-8">Daftar untuk mengakses layanan desa</p>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="Nama sesuai KTP" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="contoh@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="08xxxxxxxxxx" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kata Sandi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="Minimal 8 karakter" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Konfirmasi Kata Sandi</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="Ulangi kata sandi" />
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Daftar'}</Button>
        </form>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Sudah punya akun?{' '}
          <a href="/auth/login" className="text-[var(--color-primary)] font-medium hover:underline">Masuk</a>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/" className="text-[var(--color-text-muted)] hover:underline">&larr; Kembali ke Beranda</Link>
        </p>
      </Card>
    </div>
  );
}
