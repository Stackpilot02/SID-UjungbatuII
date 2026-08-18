// Modul validasi data — sesuai rules.md §6
// Validasi dijalankan di server sebelum data masuk database.

export function isValidNik(nik: string): boolean {
  return /^\d{16}$/.test(nik);
}

export function isValidKkNumber(kk: string): boolean {
  return /^\d{16}$/.test(kk);
}

export function isValidPhone(phone: string): boolean {
  return /^(08\d{8,12}|\+628\d{8,12})$/.test(phone);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isNotFutureDate(date: string): boolean {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() <= Date.now();
}

export function isValidFileSize(bytes: number, maxBytes = 5 * 1024 * 1024): boolean {
  return bytes > 0 && bytes <= maxBytes;
}

export const ALLOWED_ATTACHMENT_MIME = ['image/jpeg', 'image/png', 'application/pdf'];

export function isValidAttachmentMime(mime: string): boolean {
  return ALLOWED_ATTACHMENT_MIME.includes(mime);
}