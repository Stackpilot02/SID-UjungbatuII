import { randomUUID } from 'node:crypto';
import { error, success } from '@/lib/api-utils';
import { isValidFileSize } from '@/lib/validation';
import { createAdminClient } from '@/lib/supabase-admin';

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

    const db = createAdminClient();
    const filename = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { data, error: uploadError } = await db.storage
      .from('news')
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrl } = db.storage.from('news').getPublicUrl(data.path);
    return success({ url: publicUrl.publicUrl }, 201);
  } catch (err) {
    console.error('Upload foto berita gagal:', err);
    return error('Gagal mengunggah gambar', 500);
  }
}