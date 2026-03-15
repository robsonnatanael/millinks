'use client';

import { useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';
import { useLogout } from '@/features/auth';
import { useWhoamiStore } from '@/features/whoami/store';
import { useWhoamiQuery } from '@/features/whoami/hooks/use-whoami-query';

export default function Dashboard() {
  const { logout } = useLogout();
  const { whoami, setWhoamiStore } = useWhoamiStore();

  const { data } = useWhoamiQuery();

  useEffect(() => {
    if (!whoami.userName && data?.username) {
      setWhoamiStore({
        id: data.documentId,
        userName: data.username,
        isBlocked: data.blocked,
        isConfirmed: data.confirmed,
      });
    }
  }, [data, whoami]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="p-4">
        {whoami.userName ? whoami.userName : 'Carregando...'}
      </p>

      <Button variant="outline" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
