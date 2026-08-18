import { describe, it, expect } from 'vitest';
import {
  news, addNews,
  letterRequests, addLetterRequest,
  residents, addResident,
  letterTemplates, addLetterTemplate,
  users, addUser,
  complaints, addComplaint,
  activityLogs, addActivityLog,
  archivedLetters, addArchivedLetter,
} from './mock-data';

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

const baseRequest = {
  letterTypeId: '1',
  requesterName: 'Andi Nasution',
  requesterNik: '1209123456789010',
  phone: '081234567890',
  email: 'andi@example.com',
  purpose: 'Pengurusan surat domisili',
};

describe('addLetterRequest', () => {
  it('menambahkan pengajuan surat dengan id, status pending, dan createdAt', () => {
    const before = letterRequests.length;
    const record = addLetterRequest(baseRequest);

    expect(record.id).toMatch(/^LR-/);
    expect(record.status).toBe('pending');
    expect(record.createdAt).toBeTruthy();
    expect(record.requesterName).toBe(baseRequest.requesterName);
    expect(record.letterTypeId).toBe('1');
    expect(letterRequests.length).toBe(before + 1);
  });

  it('menyimpan field tambahan dan membiarkan status pending', () => {
    const record = addLetterRequest({ ...baseRequest, purpose: 'Pembuatan KK', letterTypeId: '5' });

    expect(record.purpose).toBe('Pembuatan KK');
    expect(record.letterTypeId).toBe('5');
    expect(record.status).toBe('pending');
  });
});

const baseResident = {
  nik: '1209123456789011',
  kkNumber: '1209123456789005',
  fullName: 'Rina Siregar',
  birthPlace: 'Padang Lawas',
  birthDate: '1995-02-10',
  gender: 'Perempuan',
  dusun: 'Dusun I',
  occupation: 'Pedagang',
  religion: 'Islam',
  maritalStatus: 'Belum Kawin',
  familyRole: 'Anggota',
};

describe('addResident', () => {
  it('menambahkan penduduk dengan id otomatis dan menyimpan semua field', () => {
    const before = residents.length;
    const record = addResident(baseResident);

    expect(record.id).toMatch(/^mock-/);
    expect(record.nik).toBe(baseResident.nik);
    expect(record.fullName).toBe(baseResident.fullName);
    expect(record.dusun).toBe('Dusun I');
    expect(residents.length).toBe(before + 1);
    expect(residents).toContain(record);
  });
});

const baseTemplate = {
  letterTypeId: '1',
  name: 'Template SKD v1',
  numberFormat: '{urutan}/SKD/UB-II/{bulan}/{tahun}',
  bodyTemplate: 'Surat keterangan domisili untuk {{nama}} NIK {{nik}}',
  isActive: true,
};

describe('addLetterTemplate', () => {
  it('menambahkan template dengan id, version 1, dan createdAt otomatis', () => {
    const before = letterTemplates.length;
    const record = addLetterTemplate(baseTemplate);

    expect(record.id).toMatch(/^mock-/);
    expect(record.version).toBe(1);
    expect(record.createdAt).toBeTruthy();
    expect(record.name).toBe('Template SKD v1');
    expect(record.letterTypeId).toBe('1');
    expect(record.isActive).toBe(true);
    expect(letterTemplates.length).toBe(before + 1);
  });

  it('menyimpan template non-aktif tanpa mengubah nilainya', () => {
    const record = addLetterTemplate({ ...baseTemplate, isActive: false, name: 'Template Draft' });

    expect(record.isActive).toBe(false);
    expect(record.name).toBe('Template Draft');
    expect(record.numberFormat).toContain('SKD');
  });
});

describe('addUser', () => {
  it('menambahkan pengguna dengan id otomatis dan menyimpan semua field', () => {
    const before = users.length;
    const record = addUser({ fullName: 'Budi Pohan', email: 'budi@ujungbatu2.desa.id', role: 'operator' });

    expect(record.id).toMatch(/^mock-/);
    expect(record.fullName).toBe('Budi Pohan');
    expect(record.email).toBe('budi@ujungbatu2.desa.id');
    expect(record.role).toBe('operator');
    expect(users.length).toBe(before + 1);
  });
});

describe('addComplaint', () => {
  it('menambahkan pengaduan dengan id, status pending, dan createdAt', () => {
    const before = complaints.length;
    const record = addComplaint({ categoryId: '1', description: 'Jalan rusak', location: 'Dusun I', reporterName: 'Warga' });

    expect(record.id).toMatch(/^mock-/);
    expect(record.status).toBe('pending');
    expect(record.createdAt).toBeTruthy();
    expect(record.categoryId).toBe('1');
    expect(record.description).toBe('Jalan rusak');
    expect(complaints.length).toBe(before + 1);
  });

  it('menyimpan pengaduan tanpa lokasi dengan nilai default kosong', () => {
    const record = addComplaint({ categoryId: '2', description: 'Sampah menumpuk', location: '', reporterName: 'Anonim' });

    expect(record.location).toBe('');
    expect(record.reporterName).toBe('Anonim');
    expect(record.status).toBe('pending');
  });
});

describe('addActivityLog', () => {
  it('menambahkan log aktivitas dengan id dan createdAt otomatis', () => {
    const before = activityLogs.length;
    const record = addActivityLog({ action: 'UPDATE', tableName: 'residents', performedBy: 'admin' });

    expect(record.id).toMatch(/^mock-/);
    expect(record.createdAt).toBeTruthy();
    expect(record.action).toBe('UPDATE');
    expect(record.tableName).toBe('residents');
    expect(record.performedBy).toBe('admin');
    expect(activityLogs.length).toBe(before + 1);
  });
});

describe('addArchivedLetter', () => {
  it('menambahkan arsip surat dengan id otomatis', () => {
    const before = archivedLetters.length;
    const record = addArchivedLetter({ letterNumber: '003/SKD/UB-II/07/2026', letterTypeId: '1', issuedAt: '2026-07-23T09:00:00Z' });

    expect(record.id).toMatch(/^mock-/);
    expect(record.letterNumber).toContain('SKD');
    expect(record.letterTypeId).toBe('1');
    expect(archivedLetters.length).toBe(before + 1);
  });
});