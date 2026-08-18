import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { error, success } from '@/lib/api-utils';
import { isValidFileSize } from '@/lib/validation';

export const runtime = 'nodejs';

const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File) || file.size === 0) {
      return error('File gambar wajib diunggah');
    }
    if (!isValidFileSize(file.size, MAX_SIZE)) {
      return error('Ukuran file maksimal 5 MB');
    }
    const ext = ALLOWED_MIME[file.type];
    if (!ext) {
      return error('Format gambar harus JPG, PNG, atau WebP');
    }

    // TODO: konfirmasi — penyimpanan sementara di public/uploads/gallery.
    // Integrasi final menyimpan ke Supabase Storage bucket "gallery"
    // saat koneksi Supabase tersedia (lihat architecture.md §4.3).
    const dir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    await mkdir(dir, { recursive: true });
    const filename = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    return success({ url: `/uploads/gallery/${filename}` }, 201);
  } catch (err) {
    console.error('Upload foto galeri gagal:', err);
    return error('Gagal mengunggah gambar', 500);
  }
}