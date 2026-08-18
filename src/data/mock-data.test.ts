import { describe, it, expect } from 'vitest';
import { news, addNews } from './mock-data';

const baseNews = {
  title: 'Uji Coba Berita Baru',
  slug: 'uji-coba-berita-baru',
  category: 'berita',
  excerpt: 'Ringkasan uji coba',
  content: 'Isi berita uji coba.',
  coverImageUrl: '/uploads/news/test.png',
  status: 'published',
  authorId: 'mock-admin',
  publishedAt: '2026-08-18T08:00:00Z',
};

describe('addNews', () => {
  it('menambahkan berita baru dengan id dan createdAt otomatis', () => {
    const before = news.length;
    const record = addNews(baseNews);

    expect(record.id).toMatch(/^mock-/);
    expect(record.createdAt).toBeTruthy();
    expect(record.title).toBe(baseNews.title);
    expect(record.coverImageUrl).toBe(baseNews.coverImageUrl);
    expect(news.length).toBe(before + 1);
    expect(news).toContain(record);
  });

  it('menyimpan seluruh field yang dikirim tanpa mengubah nilai', () => {
    const record = addNews({ ...baseNews, status: 'draft', excerpt: '' });

    expect(record.status).toBe('draft');
    expect(record.excerpt).toBe('');
    expect(record.category).toBe('berita');
    expect(record.publishedAt).toBe(baseNews.publishedAt);
  });
});