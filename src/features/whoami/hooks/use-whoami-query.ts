import { api } from '@/services/api';
import { DEFAULT_VALUES } from '@/shared/utils/default-values';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { QUERY_KEYS } from '../constants';
import { ENDPOINTS } from '@/shared/utils/endpoints';
import { WhoamiResponse } from '../types';

export const useWhoamiQuery = () => {
  const tokenValue = Cookies.get(DEFAULT_VALUES.COOKIE_KEY);

  const { data, isLoading, isError, error, isPending } = useQuery({
    queryKey: [QUERY_KEYS.WHOAMI],
    queryFn: () => whoamiRequest(),
    enabled: !!tokenValue,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isPending,
  };
};

export const whoamiRequest = async (): Promise<WhoamiResponse> => {
  const response = await api.get<WhoamiResponse>(ENDPOINTS.USER_ME);
  return response.data;
};
