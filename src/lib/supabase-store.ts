import { createAdminClient } from '@/lib/supabase-admin';

// Lapisan akses data Supabase.
// Menggantikan mock store di memori (src/data/mock-data.ts).
// Semua fungsi melempar Error bila query gagal; route handler yang
// bertanggung jawab mengubahnya menjadi respons JSON yang tepat.
// Kolom database memakai snake_case, hasil dikembalikan dalam camelCase
// agar sesuai dengan kontrak API aplikasi.

const db = createAdminClient();

type Row = Record<string, unknown>;

interface NewsRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: string;
  authorId: string;
  publishedAt: string;
  createdAt: string;
}

interface ResidentRow {
  id: string;
  nik: string;
  kkNumber: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  occupation: string;
  religion: string;
  maritalStatus: string;
  familyRole: string;
  createdAt: string;
}

interface GalleryItemRow {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  eventDate: string;
}

interface ComplaintRow {
  id: string;
  categoryId: string;
  description: string;
  location: string;
  status: string;
  reporterName: string;
  createdAt: string;
}

interface ActivityLogRow {
  id: string;
  action: string;
  tableName: string;
  performedBy: string;
  createdAt: string;
}

interface ArchivedLetterRow {
  id: string;
  letterNumber: string;
  letterTypeId: string;
  issuedAt: string;
}

interface LetterTemplateRow {
  id: string;
  letterTypeId: string;
  name: string;
  numberFormat: string;
  bodyTemplate: string;
  version: number;
  isActive: boolean;
  createdAt: string;
}

interface LetterRequestRow {
  id: string;
  requesterName: string;
  requesterNik: string;
  letterTypeId: string;
  phone: string;
  email: string;
  purpose: string;
  status: string;
  additionalData: Record<string, unknown>;
  createdAt: string;
}

interface UserRow {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface LetterTypeRow {
  id: string;
  code: string;
  name: string;
  numberFormat: string;
  requiresAttachment: boolean;
}

interface ComplaintCategoryRow {
  id: string;
  name: string;
  defaultSlaDays: number;
}

interface StatsRow {
  totalPopulation: number;
  maleCount: number;
  femaleCount: number;
  familyCardCount: number;
  occupationStats: { name: string; count: number }[];
  religionStats: { name: string; count: number }[];
}

interface VillageProfileRow {
  villageName: string;
  district: string;
  regency: string;
  province: string;
  history: string;
  vision: string;
  mission: string[];
  mapLat: number | null;
  mapLng: number | null;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

interface OrganizationStructureRow {
  id: string;
  name: string;
  position: string;
  orderIndex: number;
  photoUrl: string;
}

function mapNews(r: Row): NewsRow {
  return {
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    category: r.category as string,
    excerpt: (r.excerpt ?? '') as string,
    content: r.content as string,
    coverImageUrl: (r.cover_image_url ?? '') as string,
    status: r.status as string,
    authorId: (r.author_id ?? '') as string,
    publishedAt: (r.published_at ?? r.created_at) as string,
    createdAt: r.created_at as string,
  };
}

function mapResident(r: Row): ResidentRow {
  return {
    id: r.id as string,
    nik: r.nik as string,
    kkNumber: r.kk_number as string,
    fullName: r.full_name as string,
    birthPlace: (r.birth_place ?? '') as string,
    birthDate: (r.birth_date ?? '') as string,
    gender: (r.gender ?? '') as string,
    occupation: (r.occupation ?? '') as string,
    religion: (r.religion ?? 'Islam') as string,
    maritalStatus: (r.marital_status ?? 'Belum Kawin') as string,
    familyRole: (r.family_role ?? 'Anggota') as string,
    createdAt: r.created_at as string,
  };
}

function mapGalleryItem(r: Row): GalleryItemRow {
  return {
    id: r.id as string,
    title: r.title as string,
    description: (r.description ?? '') as string,
    mediaUrl: (r.media_url ?? '') as string,
    mediaType: (r.media_type ?? 'image') as string,
    eventDate: (r.event_date ?? '') as string,
  };
}

function mapComplaint(r: Row): ComplaintRow {
  return {
    id: r.id as string,
    categoryId: r.category_id as string,
    description: r.description as string,
    location: (r.location ?? '') as string,
    status: r.status as string,
    reporterName: (r.reporter_name ?? 'Warga') as string,
    createdAt: r.created_at as string,
  };
}

function mapActivityLog(r: Row): ActivityLogRow {
  return {
    id: r.id as string,
    action: r.action as string,
    tableName: r.table_name as string,
    performedBy: (r.performed_by ?? 'Sistem') as string,
    createdAt: r.created_at as string,
  };
}

function mapArchivedLetter(r: Row): ArchivedLetterRow {
  return {
    id: r.id as string,
    letterNumber: r.letter_number as string,
    letterTypeId: r.letter_type_id as string,
    issuedAt: r.issued_at as string,
  };
}

function mapLetterTemplate(r: Row): LetterTemplateRow {
  return {
    id: r.id as string,
    letterTypeId: r.letter_type_id as string,
    name: r.name as string,
    numberFormat: r.number_format as string,
    bodyTemplate: r.body_template as string,
    version: r.version as number,
    isActive: r.is_active as boolean,
    createdAt: r.created_at as string,
  };
}

function mapLetterRequest(r: Row): LetterRequestRow {
  return {
    id: r.id as string,
    requesterName: r.requester_name as string,
    requesterNik: r.requester_nik as string,
    letterTypeId: r.letter_type_id as string,
    phone: (r.phone ?? '') as string,
    email: (r.email ?? '') as string,
    purpose: r.purpose as string,
    status: r.status as string,
    additionalData: (r.additional_data ?? {}) as Record<string, unknown>,
    createdAt: r.created_at as string,
  };
}

function mapUser(r: Row): UserRow {
  return {
    id: r.id as string,
    fullName: r.full_name as string,
    email: r.email as string,
    role: r.role as string,
  };
}

function mapLetterType(r: Row): LetterTypeRow {
  return {
    id: r.id as string,
    code: r.code as string,
    name: r.name as string,
    numberFormat: r.number_format as string,
    requiresAttachment: r.requires_attachment as boolean,
  };
}

function mapComplaintCategory(r: Row): ComplaintCategoryRow {
  return {
    id: r.id as string,
    name: r.name as string,
    defaultSlaDays: r.default_sla_days as number,
  };
}

function mapStats(r: Row): StatsRow {
  return {
    totalPopulation: r.total_population as number,
    maleCount: r.male_count as number,
    femaleCount: r.female_count as number,
    familyCardCount: r.family_card_count as number,
    occupationStats: (r.occupation_stats ?? []) as { name: string; count: number }[],
    religionStats: (r.religion_stats ?? []) as { name: string; count: number }[],
  };
}

function mapVillageProfile(r: Row): VillageProfileRow {
  return {
    villageName: r.village_name as string,
    district: (r.district ?? '') as string,
    regency: (r.regency ?? '') as string,
    province: (r.province ?? '') as string,
    history: (r.history ?? '') as string,
    vision: (r.vision ?? '') as string,
    mission: (r.mission ?? []) as string[],
    mapLat: (r.map_lat ?? null) as number | null,
    mapLng: (r.map_lng ?? null) as number | null,
    address: (r.address ?? '') as string,
    phone: (r.phone ?? '') as string,
    email: (r.email ?? '') as string,
    workingHours: (r.working_hours ?? '') as string,
  };
}

function mapOrganizationStructure(r: Row): OrganizationStructureRow {
  return {
    id: r.id as string,
    name: r.name as string,
    position: r.position as string,
    orderIndex: r.order_index as number,
    photoUrl: (r.photo_url ?? '') as string,
  };
}

// ============================================================
// Berita (news)
// ============================================================

export async function getNews(): Promise<ReturnType<typeof mapNews>[]> {
  const { data, error } = await db
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapNews);
}

export async function getNewsById(id: string) {
  const { data, error } = await db.from('news').select('*').eq('id', id).single();
  if (error) return null;
  return mapNews(data);
}

export async function getPublishedNews(): Promise<ReturnType<typeof mapNews>[]> {
  const { data, error } = await db
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapNews);
}

export async function addNews(item: {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: string;
  authorId: string;
  publishedAt: string;
}): Promise<ReturnType<typeof mapNews>> {
  const { data, error } = await db
    .from('news')
    .insert({
      title: item.title,
      slug: item.slug,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      cover_image_url: item.coverImageUrl,
      status: item.status,
      author_id: item.authorId,
      published_at: item.publishedAt,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapNews(data);
}

export async function updateNews(
  id: string,
  patch: Record<string, unknown>
): Promise<ReturnType<typeof mapNews>> {
  const { data, error } = await db
    .from('news')
    .update({
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.slug !== undefined ? { slug: patch.slug } : {}),
      ...(patch.category !== undefined ? { category: patch.category } : {}),
      ...(patch.excerpt !== undefined ? { excerpt: patch.excerpt } : {}),
      ...(patch.content !== undefined ? { content: patch.content } : {}),
      ...(patch.coverImageUrl !== undefined ? { cover_image_url: patch.coverImageUrl } : {}),
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.publishedAt !== undefined ? { published_at: patch.publishedAt } : {}),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapNews(data);
}

export async function deleteNews(id: string): Promise<boolean> {
  const { error, count } = await db.from('news').delete({ count: 'exact' }).eq('id', id);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

export async function isNewsSlugTaken(slug: string, excludeId?: string) {
  let query = db.from('news').select('id').eq('slug', slug);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

// ============================================================
// Galeri (gallery_items)
// ============================================================

export async function getGalleryItems(): Promise<ReturnType<typeof mapGalleryItem>[]> {
  const { data, error } = await db
    .from('gallery_items')
    .select('*')
    .order('event_date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapGalleryItem);
}

export async function addGalleryItem(item: {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  eventDate: string;
}): Promise<ReturnType<typeof mapGalleryItem>> {
  const { data, error } = await db
    .from('gallery_items')
    .insert({
      title: item.title,
      description: item.description,
      media_url: item.mediaUrl,
      media_type: item.mediaType,
      event_date: item.eventDate || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapGalleryItem(data);
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const { error, count } = await db.from('gallery_items').delete({ count: 'exact' }).eq('id', id);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

// ============================================================
// Penduduk (residents)
// ============================================================

export async function getResidents(): Promise<ReturnType<typeof mapResident>[]> {
  const { data, error } = await db.from('residents').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapResident);
}

export async function getResidentById(id: string) {
  const { data, error } = await db.from('residents').select('*').eq('id', id).single();
  if (error) return null;
  return mapResident(data);
}

export async function addResident(item: {
  nik: string;
  kkNumber: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  occupation: string;
  religion: string;
  maritalStatus: string;
  familyRole: string;
}): Promise<ReturnType<typeof mapResident>> {
  const { data, error } = await db
    .from('residents')
    .insert({
      nik: item.nik,
      kk_number: item.kkNumber,
      full_name: item.fullName,
      birth_place: item.birthPlace,
      birth_date: item.birthDate || null,
      gender: item.gender,
      occupation: item.occupation,
      religion: item.religion,
      marital_status: item.maritalStatus,
      family_role: item.familyRole,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapResident(data);
}

export async function updateResident(id: string, patch: Record<string, unknown>) {
  const { data, error } = await db
    .from('residents')
    .update({
      ...(patch.nik !== undefined ? { nik: patch.nik } : {}),
      ...(patch.kkNumber !== undefined ? { kk_number: patch.kkNumber } : {}),
      ...(patch.fullName !== undefined ? { full_name: patch.fullName } : {}),
      ...(patch.birthPlace !== undefined ? { birth_place: patch.birthPlace } : {}),
      ...(patch.birthDate !== undefined ? { birth_date: patch.birthDate } : {}),
      ...(patch.gender !== undefined ? { gender: patch.gender } : {}),
      ...(patch.occupation !== undefined ? { occupation: patch.occupation } : {}),
      ...(patch.religion !== undefined ? { religion: patch.religion } : {}),
      ...(patch.maritalStatus !== undefined ? { marital_status: patch.maritalStatus } : {}),
      ...(patch.familyRole !== undefined ? { family_role: patch.familyRole } : {}),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapResident(data);
}

export async function deleteResident(id: string): Promise<boolean> {
  const { error, count } = await db.from('residents').delete({ count: 'exact' }).eq('id', id);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

export async function isNikTaken(nik: string, excludeId?: string) {
  let query = db.from('residents').select('id').eq('nik', nik);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

// ============================================================
// Pengajuan surat (letter_requests)
// ============================================================

export async function getLetterRequests(): Promise<ReturnType<typeof mapLetterRequest>[]> {
  const { data, error } = await db
    .from('letter_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapLetterRequest);
}

export async function getLetterRequestById(ref: string) {
  const { data, error } = await db.from('letter_requests').select('*').eq('id', ref).single();
  if (error) return null;
  return mapLetterRequest(data);
}

export async function addLetterRequest(item: {
  id: string;
  requesterName: string;
  requesterNik: string;
  letterTypeId: string;
  phone: string;
  email: string;
  purpose: string;
  additionalData?: Record<string, unknown>;
}): Promise<ReturnType<typeof mapLetterRequest>> {
  const { data, error } = await db
    .from('letter_requests')
    .insert({
      id: item.id,
      requester_name: item.requesterName,
      requester_nik: item.requesterNik,
      letter_type_id: item.letterTypeId,
      phone: item.phone,
      email: item.email,
      purpose: item.purpose,
      additional_data: item.additionalData ?? {},
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapLetterRequest(data);
}

export async function updateLetterRequest(id: string, patch: Record<string, unknown>) {
  const { data, error } = await db
    .from('letter_requests')
    .update({
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.purpose !== undefined ? { purpose: patch.purpose } : {}),
      ...(patch.additionalData !== undefined ? { additional_data: patch.additionalData } : {}),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapLetterRequest(data);
}

// ============================================================
// Template surat (letter_templates)
// ============================================================

export async function getLetterTemplates(): Promise<ReturnType<typeof mapLetterTemplate>[]> {
  const { data, error } = await db
    .from('letter_templates')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapLetterTemplate);
}

export async function getLetterTemplateById(id: string) {
  const { data, error } = await db.from('letter_templates').select('*').eq('id', id).single();
  if (error) return null;
  return mapLetterTemplate(data);
}

export async function addLetterTemplate(item: {
  letterTypeId: string;
  name: string;
  numberFormat: string;
  bodyTemplate: string;
  isActive: boolean;
}): Promise<ReturnType<typeof mapLetterTemplate>> {
  const { data, error } = await db
    .from('letter_templates')
    .insert({
      letter_type_id: item.letterTypeId,
      name: item.name,
      number_format: item.numberFormat,
      body_template: item.bodyTemplate,
      is_active: item.isActive,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapLetterTemplate(data);
}

export async function updateLetterTemplate(id: string, patch: Record<string, unknown>) {
  const current = await db.from('letter_templates').select('version').eq('id', id).single();
  if (current.error) throw new Error(current.error.message);

  const { data, error } = await db
    .from('letter_templates')
    .update({
      ...(patch.letterTypeId !== undefined ? { letter_type_id: patch.letterTypeId } : {}),
      ...(patch.name !== undefined ? { name: patch.name } : {}),
      ...(patch.numberFormat !== undefined ? { number_format: patch.numberFormat } : {}),
      ...(patch.bodyTemplate !== undefined ? { body_template: patch.bodyTemplate } : {}),
      ...(patch.isActive !== undefined ? { is_active: patch.isActive } : {}),
      version: (current.data.version ?? 1) + 1,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapLetterTemplate(data);
}

export async function deleteLetterTemplate(id: string): Promise<boolean> {
  const { error, count } = await db.from('letter_templates').delete({ count: 'exact' }).eq('id', id);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

// ============================================================
// Pengguna (users)
// ============================================================

export async function getUsers(): Promise<ReturnType<typeof mapUser>[]> {
  const { data, error } = await db.from('users').select('*').order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapUser);
}

export async function getUserById(id: string) {
  const { data, error } = await db.from('users').select('*').eq('id', id).single();
  if (error) return null;
  return mapUser(data);
}

export async function addUser(item: {
  fullName: string;
  email: string;
  role: string;
}): Promise<ReturnType<typeof mapUser>> {
  const { data, error } = await db
    .from('users')
    .insert({ full_name: item.fullName, email: item.email, role: item.role })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapUser(data);
}

export async function updateUser(id: string, patch: Record<string, unknown>) {
  const { data, error } = await db
    .from('users')
    .update({
      ...(patch.fullName !== undefined ? { full_name: patch.fullName } : {}),
      ...(patch.email !== undefined ? { email: patch.email } : {}),
      ...(patch.role !== undefined ? { role: patch.role } : {}),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapUser(data);
}

export async function isEmailTaken(email: string, excludeId?: string) {
  let query = db.from('users').select('id').eq('email', email);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

// ============================================================
// Pengaduan (complaints)
// ============================================================

export async function getComplaints(): Promise<ReturnType<typeof mapComplaint>[]> {
  const { data, error } = await db
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapComplaint);
}

export async function addComplaint(item: {
  categoryId: string;
  description: string;
  location: string;
  reporterName: string;
}): Promise<ReturnType<typeof mapComplaint>> {
  const { data, error } = await db
    .from('complaints')
    .insert({
      category_id: item.categoryId,
      description: item.description,
      location: item.location,
      reporter_name: item.reporterName,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapComplaint(data);
}

export async function updateComplaint(id: string, patch: Record<string, unknown>) {
  const { data, error } = await db
    .from('complaints')
    .update({
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.description !== undefined ? { description: patch.description } : {}),
      ...(patch.location !== undefined ? { location: patch.location } : {}),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapComplaint(data);
}

// ============================================================
// Log aktivitas (activity_logs)
// ============================================================

export async function getActivityLogs(): Promise<ReturnType<typeof mapActivityLog>[]> {
  const { data, error } = await db
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapActivityLog);
}

export async function addActivityLog(item: {
  action: string;
  tableName: string;
  performedBy: string;
}): Promise<ReturnType<typeof mapActivityLog>> {
  const { data, error } = await db
    .from('activity_logs')
    .insert({
      action: item.action,
      table_name: item.tableName,
      performed_by: item.performedBy,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapActivityLog(data);
}

// ============================================================
// Arsip surat (letters)
// ============================================================

export async function getArchivedLetters(): Promise<ReturnType<typeof mapArchivedLetter>[]> {
  const { data, error } = await db
    .from('letters')
    .select('*')
    .order('issued_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapArchivedLetter);
}

export async function addArchivedLetter(item: {
  letterNumber: string;
  letterTypeId: string;
  issuedAt: string;
}): Promise<ReturnType<typeof mapArchivedLetter>> {
  const { data, error } = await db
    .from('letters')
    .insert({
      letter_number: item.letterNumber,
      letter_type_id: item.letterTypeId,
      issued_at: item.issuedAt,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapArchivedLetter(data);
}

// ============================================================
// Referensi (letter_types, complaint_categories)
// ============================================================

export async function getLetterTypes(): Promise<ReturnType<typeof mapLetterType>[]> {
  const { data, error } = await db.from('letter_types').select('*').order('id', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapLetterType);
}

export async function getComplaintCategories(): Promise<ReturnType<typeof mapComplaintCategory>[]> {
  const { data, error } = await db.from('complaint_categories').select('*').order('id', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapComplaintCategory);
}

// ============================================================
// Statistik (village_stats)
// ============================================================

export async function getStats() {
  const { data, error } = await db.from('village_stats').select('*').eq('id', 1).single();
  if (error) throw new Error(error.message);
  return mapStats(data);
}

export async function updateStats(next: {
  totalPopulation: number;
  maleCount: number;
  femaleCount: number;
  familyCardCount: number;
  occupationStats: { name: string; count: number }[];
  religionStats: { name: string; count: number }[];
}) {
  const { data, error } = await db
    .from('village_stats')
    .update({
      total_population: next.totalPopulation,
      male_count: next.maleCount,
      female_count: next.femaleCount,
      family_card_count: next.familyCardCount,
      occupation_stats: next.occupationStats,
      religion_stats: next.religionStats,
    })
    .eq('id', 1)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapStats(data);
}

// ============================================================
// Profil desa & struktur organisasi
// ============================================================

export async function getVillageProfile() {
  const { data, error } = await db.from('village_profile').select('*').eq('id', 1).single();
  if (error) throw new Error(error.message);
  return mapVillageProfile(data);
}

export async function getOrganizationStructure(): Promise<ReturnType<typeof mapOrganizationStructure>[]> {
  const { data, error } = await db
    .from('organization_structure')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapOrganizationStructure);
}

// ============================================================
// Dashboard (gabungan beberapa tabel)
// ============================================================

export async function getDashboardData() {
  const [listStats, listRequests, listComplaints, listLogs, listResidents] = await Promise.all([
    getStats(),
    getLetterRequests(),
    getComplaints(),
    getActivityLogs(),
    getResidents(),
  ]);

  return {
    stats: listStats,
    recentRequests: listRequests.slice(0, 5),
    recentComplaints: listComplaints.slice(0, 5),
    recentLogs: listLogs.slice(0, 10),
    residents: listResidents,
    letterRequests: listRequests,
    complaints: listComplaints,
    activityLogs: listLogs,
  };
}