import { success } from '@/lib/api-utils';

export async function GET() {
  return success({
    address: 'Jl. Poros Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara',
    phone: '(0623) 1234567',
    email: 'desa.ujungbatu2@gmail.com',
    workingHours: 'Senin - Jumat, 08:00 - 16:00 WIB',
  });
}
