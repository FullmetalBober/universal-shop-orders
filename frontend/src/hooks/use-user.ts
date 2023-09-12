import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../api/users';
import { getBasket } from '../api/baskets';
import { getOrders } from '../api/orders';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: document.cookie.includes(import.meta.env.VITE_AUTH_CHECKER),
  });
};

export const useGetBasket = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User | undefined;
  return useQuery({
    queryKey: ['basket'],
    queryFn: () => getBasket(),
    enabled: !!user,
  });
};

export const useGetOrders = (status?: string) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User | undefined;
  return useQuery({
    queryKey: ['orders', status],
    queryFn: ({ signal, pageParam }) =>
      getOrders({ status: pageParam, signal }),
    enabled: !!user,
  });
};
