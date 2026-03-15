import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { queryClient } from '@/providers/query';
import { PRIVATE_ROUTE } from '@/shared/routes';
import { DEFAULT_VALUES } from '@/shared/utils/default-values';
import { logger } from '@/lib/logger';
import { QUERY_KEYS, whoamiRequest, useWhoamiStore } from '@/features/whoami';

import { loginRequest } from '../services/auth-service';
import { AUTH_MESSAGES } from '../utils/messages';

export const useLoginMutation = () => {
  const { setWhoamiStore } = useWhoamiStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async response => {
      if (response?.status !== 200) return;

      try {
        const dataWhoami = await queryClient.fetchQuery({
          queryKey: [QUERY_KEYS.WHOAMI],
          queryFn: whoamiRequest,
        });

        setWhoamiStore({
          id: dataWhoami.documentId,
          userName: dataWhoami.username,
          isBlocked: dataWhoami.blocked,
          isConfirmed: dataWhoami.confirmed,
        });

        router.push(PRIVATE_ROUTE.DASHBOARD);
      } catch (error) {
        handleLoginError(error);
      }
    },
    onError: handleLoginError,
  });

  return { mutation };
};

const handleLoginError = (error: unknown) => {
  if (isAxiosError(error)) {
    const isForbidden = error.response?.status === 403;
    const message = isForbidden
      ? AUTH_MESSAGES.FORBIDDEN
      : error.response?.data?.error?.message || AUTH_MESSAGES.LOGIN_ERROR;

    toast.error(message);
  } else {
    toast.error(AUTH_MESSAGES.UNEXPECTED_ERROR);
  }

  Cookies.remove(DEFAULT_VALUES.COOKIE_KEY);
  logger.error(AUTH_MESSAGES.LOGIN_ERROR, error);
};
