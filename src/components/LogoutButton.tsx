'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function LogoutButton({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-sm text-gray-300 hover:text-white transition flex items-center gap-2"
    >
      {!collapsed && 'Keluar'}
    </button>
  );
}