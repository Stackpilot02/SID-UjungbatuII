// Modul penomoran surat otomatis — sesuai rules.md §3
// Format: {urutan}/{kode_jenis_surat}/{kode_desa}/{bulan_romawi}/{tahun}
// Contoh: 012/SKD/UB-II/VII/2026

export const DESA_CODE = 'UB-II';

const ROMAN_MONTHS = [
  'I', 'II', 'III', 'IV', 'V', 'VI',
  'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
] as const;

export function toRomanMonth(month: number): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Bulan tidak valid: ${month} (harus 1-12)`);
  }
  return ROMAN_MONTHS[month - 1];
}

export function formatSequence(seq: number): string {
  if (!Number.isInteger(seq) || seq < 1) {
    throw new Error(`Urutan tidak valid: ${seq} (harus bilangan bulat >= 1)`);
  }
  return String(seq).padStart(3, '0');
}

export interface LetterNumberInput {
  sequence: number;
  letterTypeCode: string;
  month: number;
  year: number;
}

export function buildLetterNumber(input: LetterNumberInput): string {
  const { sequence, letterTypeCode, month, year } = input;
  if (!letterTypeCode || letterTypeCode.trim() === '') {
    throw new Error('Kode jenis surat wajib diisi');
  }
  if (!Number.isInteger(year) || year < 1) {
    throw new Error(`Tahun tidak valid: ${year}`);
  }
  return `${formatSequence(sequence)}/${letterTypeCode}/${DESA_CODE}/${toRomanMonth(month)}/${year}`;
}