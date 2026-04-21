'use client';

import { useRouter } from 'next/navigation';
import { logoutRequest } from '../services/auth-service';
import { useWhoamiStore, QUERY_KEYS } from '@/features/whoami';
import { queryClient } from '@/providers/query';
import { PUBLIC_ROUTE } from '@/shared/routes';

export const useLogout = () => {
  const router = useRouter();
  const { clearWhoamiStore } = useWhoamiStore();

  const logout = () => {
    logoutRequest();
    clearWhoamiStore();

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.WHOAMI],
      refetchType: 'none',
    });

    router.push(PUBLIC_ROUTE.LOGIN);
  };

  return {
    logout,
  };
};
