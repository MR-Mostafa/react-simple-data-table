import { useQuery } from '@tanstack/react-query';

import { ProductList } from '~src/types';

import { getFetcher } from './api';

export const useGetAllProducts = () => {
	const key = ['products'];

	return useQuery<ProductList>(
		key,
		async () => {
			const { data } = await getFetcher<ProductList>(`/products?limit=100`);

			return data;
		},
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		}
	);
};
