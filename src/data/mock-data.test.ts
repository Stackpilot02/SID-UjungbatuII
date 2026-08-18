import { describe, it, expect } from 'vitest';
import {
  news, addNews, updateNews, deleteNews,
  letterRequests, addLetterRequest,
  residents, addResident, updateResident, deleteResident,
  letterTemplates, addLetterTemplate, updateLetterTemplate, deleteLetterTemplate,
  users, addUser, updateUser,
  complaints, addComplaint,
  activityLogs, addActivityLog,
  archivedLetters, addArchivedLetter,
  galleryItems, addGalleryItem, deleteGalleryItem,
  stats, updateStats,
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

describe('updateNews', () => {
  it('memperbarui berita berdasarkan id dan mengembalikan data terbaru', () => {
    const record = addNews(baseNews);
    const updated = updateNews(record.id, { title: 'Judul Baru', status: 'draft' });

    expect(updated).not.toBeNull();
    expect(updated!.title).toBe('Judul Baru');
    expect(updated!.status).toBe('draft');
    expect(updated!.id).toBe(record.id);
    expect(news.find((n) => n.id === record.id)?.title).toBe('Judul Baru');
  });

  it('mengembalikan null jika id tidak ditemukan', () => {
    expect(updateNews('tidak-ada', { title: 'X' })).toBeNull();
  });
});

describe('deleteNews', () => {
  it('menghapus berita berdasarkan id dan mengembalikan true', () => {
    const record = addNews(baseNews);
    const before = news.length;

    expect(deleteNews(record.id)).toBe(true);
    expect(news.length).toBe(before - 1);
    expect(news.find((n) => n.id === record.id)).toBeUndefined();
  });

  it('mengembalikan false jika id tidak ditemukan', () => {
    expect(deleteNews('tidak-ada')).toBe(false);
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
    expect(record.occupation).toBe('Pedagang');
    expect(residents.length).toBe(before + 1);
    expect(residents).toContain(record);
  });
});

describe('updateResident', () => {
  it('memperbarui penduduk berdasarkan id dan mengembalikan data terbaru', () => {
    const record = addResident(baseResident);
    const updated = updateResident(record.id, { occupation: 'Petani', maritalStatus: 'Kawin' });

    expect(updated).not.toBeNull();
    expect(updated!.occupation).toBe('Petani');
    expect(updated!.maritalStatus).toBe('Kawin');
    expect(updated!.fullName).toBe(baseResident.fullName);
    expect(residents.find((r) => r.id === record.id)?.occupation).toBe('Petani');
  });

  it('mengembalikan null jika id tidak ditemukan', () => {
    expect(updateResident('tidak-ada', { fullName: 'X' })).toBeNull();
  });
});

describe('deleteResident', () => {
  it('menghapus penduduk berdasarkan id dan mengembalikan true', () => {
    const record = addResident(baseResident);
    const before = residents.length;

    expect(deleteResident(record.id)).toBe(true);
    expect(residents.length).toBe(before - 1);
    expect(residents.find((r) => r.id === record.id)).toBeUndefined();
  });

  it('mengembalikan false jika id tidak ditemukan', () => {
    expect(deleteResident('tidak-ada')).toBe(false);
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

describe('updateLetterTemplate', () => {
  it('memperbarui template dan menaikkan versi', () => {
    const record = addLetterTemplate(baseTemplate);
    const updated = updateLetterTemplate(record.id, { isActive: false, bodyTemplate: 'Isi baru' });

    expect(updated).not.toBeNull();
    expect(updated!.isActive).toBe(false);
    expect(updated!.bodyTemplate).toBe('Isi baru');
    expect(updated!.version).toBe(2);
    expect(updated!.id).toBe(record.id);
  });

  it('mengembalikan null jika id tidak ditemukan', () => {
    expect(updateLetterTemplate('tidak-ada', { name: 'X' })).toBeNull();
  });
});

describe('deleteLetterTemplate', () => {
  it('menghapus template berdasarkan id dan mengembalikan true', () => {
    const record = addLetterTemplate(baseTemplate);
    const before = letterTemplates.length;

    expect(deleteLetterTemplate(record.id)).toBe(true);
    expect(letterTemplates.length).toBe(before - 1);
    expect(letterTemplates.find((t) => t.id === record.id)).toBeUndefined();
  });

  it('mengembalikan false jika id tidak ditemukan', () => {
    expect(deleteLetterTemplate('tidak-ada')).toBe(false);
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

describe('updateUser', () => {
  it('memperbarui pengguna berdasarkan id', () => {
    const record = addUser({ fullName: 'Citra', email: 'citra@desa.id', role: 'operator' });
    const updated = updateUser(record.id, { role: 'admin', fullName: 'Citra Siregar' });

    expect(updated).not.toBeNull();
    expect(updated!.role).toBe('admin');
    expect(updated!.fullName).toBe('Citra Siregar');
    expect(updated!.email).toBe('citra@desa.id');
  });

  it('mengembalikan null jika id tidak ditemukan', () => {
    expect(updateUser('tidak-ada', { role: 'admin' })).toBeNull();
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

describe('galleryItems', () => {
  it('menambahkan item galeri dengan id otomatis dan menyimpan semua field', () => {
    const before = galleryItems.length;
    const record = addGalleryItem({ title: 'Foto Baru', description: 'Kegiatan desa', mediaUrl: '/gallery/baru.jpg', mediaType: 'image', eventDate: '2026-08-01' });

    expect(record.id).toMatch(/^mock-/);
    expect(record.title).toBe('Foto Baru');
    expect(record.mediaUrl).toBe('/gallery/baru.jpg');
    expect(galleryItems.length).toBe(before + 1);
    expect(galleryItems).toContain(record);
  });

  it('menghapus item galeri berdasarkan id dan mengembalikan true', () => {
    const record = addGalleryItem({ title: 'Foto Hapus', description: '', mediaUrl: '/gallery/hapus.jpg', mediaType: 'image', eventDate: '2026-08-02' });
    const before = galleryItems.length;

    expect(deleteGalleryItem(record.id)).toBe(true);
    expect(galleryItems.length).toBe(before - 1);
    expect(galleryItems.find((g) => g.id === record.id)).toBeUndefined();
  });

  it('mengembalikan false saat menghapus id yang tidak ada', () => {
    expect(deleteGalleryItem('tidak-ada')).toBe(false);
  });
});

describe('updateStats', () => {
  it('memperbarui seluruh angka agregat statistik', () => {
    const next = {
      totalPopulation: 1300,
      maleCount: 650,
      femaleCount: 650,
      familyCardCount: 400,
      occupationStats: [{ name: 'Petani', count: 500 }],
      religionStats: [{ name: 'Islam', count: 1290 }],
    };

    updateStats(next);

    expect(stats.totalPopulation).toBe(1300);
    expect(stats.maleCount).toBe(650);
    expect(stats.femaleCount).toBe(650);
    expect(stats.familyCardCount).toBe(400);
    expect(stats.occupationStats).toEqual([{ name: 'Petani', count: 500 }]);
    expect(stats.religionStats).toEqual([{ name: 'Islam', count: 1290 }]);
  });

  it('menyalin array agar tidak saling mereferensi objek yang sama', () => {
    const next = {
      totalPopulation: 1250,
      maleCount: 620,
      femaleCount: 630,
      familyCardCount: 380,
      occupationStats: [{ name: 'Petani', count: 450 }],
      religionStats: [{ name: 'Islam', count: 1240 }],
    };

    const source = { name: 'Petani', count: 450 };
    updateStats({ ...next, occupationStats: [source] });

    source.count = 999;
    expect(stats.occupationStats[0].count).toBe(450);
  });
});