import { describe, it, expect } from 'vitest';
import {
  buildLetterNumber,
  toRomanMonth,
  formatSequence,
  DESA_CODE,
} from '../letter-number';

describe('toRomanMonth', () => {
  it('mengonversi bulan 1-12 ke angka Romawi', () => {
    expect(toRomanMonth(1)).toBe('I');
    expect(toRomanMonth(7)).toBe('VII');
    expect(toRomanMonth(12)).toBe('XII');
  });

  it('menolak bulan di luar rentang 1-12', () => {
    expect(() => toRomanMonth(0)).toThrow('Bulan tidak valid');
    expect(() => toRomanMonth(13)).toThrow('Bulan tidak valid');
    expect(() => toRomanMonth(1.5)).toThrow('Bulan tidak valid');
  });
});

describe('formatSequence', () => {
  it('mengisi urutan dengan 3 digit (padding nol)', () => {
    expect(formatSequence(1)).toBe('001');
    expect(formatSequence(12)).toBe('012');
    expect(formatSequence(123)).toBe('123');
  });

  it('menolak urutan non-positif', () => {
    expect(() => formatSequence(0)).toThrow('Urutan tidak valid');
    expect(() => formatSequence(-5)).toThrow('Urutan tidak valid');
  });
});

describe('buildLetterNumber', () => {
  it('menghasilkan format sesuai rules.md §3', () => {
    const num = buildLetterNumber({
      sequence: 12,
      letterTypeCode: 'SKD',
      month: 7,
      year: 2026,
    });
    expect(num).toBe('012/SKD/UB-II/VII/2026');
  });

  it('menghasilkan nomor terurut dengan urutan berurutan', () => {
    const base = { letterTypeCode: 'SKU', month: 1, year: 2026 };
    const first = buildLetterNumber({ ...base, sequence: 1 });
    const second = buildLetterNumber({ ...base, sequence: 2 });
    expect(first).toBe('001/SKU/UB-II/I/2026');
    expect(second).toBe('002/SKU/UB-II/I/2026');
  });

  it('menolak kode jenis surat kosong', () => {
    expect(() =>
      buildLetterNumber({ sequence: 1, letterTypeCode: '', month: 1, year: 2026 })
    ).toThrow('Kode jenis surat wajib diisi');
  });

  it('menolak tahun tidak valid', () => {
    expect(() =>
      buildLetterNumber({ sequence: 1, letterTypeCode: 'SKD', month: 1, year: 0 })
    ).toThrow('Tahun tidak valid');
  });
});

describe('DESA_CODE', () => {
  it('kode desa konsisten UB-II', () => {
    expect(DESA_CODE).toBe('UB-II');
  });
});