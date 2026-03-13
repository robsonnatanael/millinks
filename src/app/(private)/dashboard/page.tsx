'use client';

import { Button } from '@/shared/components/ui/button';
import { useLogout } from '@/features/auth';

export default function Dashboard() {
  const { logout } = useLogout();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Button variant="outline" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
