import { describe, it, expect } from 'vitest';
import {
  isValidNik,
  isValidKkNumber,
  isValidPhone,
  isValidEmail,
  isNotFutureDate,
  isValidFileSize,
  isValidAttachmentMime,
} from '../validation';

describe('isValidNik', () => {
  it('menerima NIK 16 digit angka', () => {
    expect(isValidNik('1209123456789001')).toBe(true);
  });

  it('menolak NIK dengan panjang != 16 atau bukan angka', () => {
    expect(isValidNik('12091234567890')).toBe(false);
    expect(isValidNik('12091234567890012')).toBe(false);
    expect(isValidNik('12091234567890ab')).toBe(false);
  });
});

describe('isValidKkNumber', () => {
  it('menerima nomor KK 16 digit angka', () => {
    expect(isValidKkNumber('1209123456789001')).toBe(true);
  });

  it('menolak nomor KK tidak valid', () => {
    expect(isValidKkNumber('123')).toBe(false);
    expect(isValidKkNumber('12091234567890aa')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('menerima format Indonesia 08... dan +62...', () => {
    expect(isValidPhone('081234567890')).toBe(true);
    expect(isValidPhone('+6281234567890')).toBe(true);
  });

  it('menolak format telepon tidak valid', () => {
    expect(isValidPhone('12345')).toBe(false);
    expect(isValidPhone('628123456789')).toBe(false);
    expect(isValidPhone('0812')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('menerima email format valid', () => {
    expect(isValidEmail('warga@example.com')).toBe(true);
  });

  it('menolak email tidak valid', () => {
    expect(isValidEmail('bukan-email')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isNotFutureDate', () => {
  it('menerima tanggal di masa lalu / hari ini', () => {
    expect(isNotFutureDate('2000-01-01')).toBe(true);
    expect(isNotFutureDate(new Date().toISOString())).toBe(true);
  });

  it('menolak tanggal di masa depan dan tanggal invalid', () => {
    expect(isNotFutureDate('2999-01-01')).toBe(false);
    expect(isNotFutureDate('bukan-tanggal')).toBe(false);
  });
});

describe('isValidFileSize', () => {
  it('menerima ukuran file <= 5MB', () => {
    expect(isValidFileSize(1024)).toBe(true);
    expect(isValidFileSize(5 * 1024 * 1024)).toBe(true);
  });

  it('menolak file > 5MB atau <= 0', () => {
    expect(isValidFileSize(5 * 1024 * 1024 + 1)).toBe(false);
    expect(isValidFileSize(0)).toBe(false);
  });
});

describe('isValidAttachmentMime', () => {
  it('menerima JPG/PNG/PDF', () => {
    expect(isValidAttachmentMime('image/jpeg')).toBe(true);
    expect(isValidAttachmentMime('image/png')).toBe(true);
    expect(isValidAttachmentMime('application/pdf')).toBe(true);
  });

  it('menolak tipe file lain', () => {
    expect(isValidAttachmentMime('text/plain')).toBe(false);
    expect(isValidAttachmentMime('')).toBe(false);
  });
});