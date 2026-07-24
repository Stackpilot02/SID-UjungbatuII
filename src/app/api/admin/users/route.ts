import { success, error } from '@/lib/api-utils';

const mockUsers = [
  { id: '1', full_name: 'Muhammad Yusuf Lubis', email: 'kades@ujungbatu2.desa.id', role: 'kepala_desa' },
  { id: '2', full_name: 'Ahmad Siregar', email: 'sekdes@ujungbatu2.desa.id', role: 'admin' },
  { id: '3', full_name: 'Fatimah Harahap', email: 'fatimah@ujungbatu2.desa.id', role: 'operator' },
];

export async function GET() {
  return success(mockUsers);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return error('Missing id');
  const body = await request.json();
  return success({ id, ...body });
}
