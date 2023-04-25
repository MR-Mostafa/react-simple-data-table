import { useQuery } from '@tanstack/react-query';

import { ProductList } from '~src/types';

import { getFetcher } from './api';

interface GetProductsProps {
	page: number;
	limit: number;
}

export const useGetAllProducts = ({ page, limit }: GetProductsProps) => {
	const pageNumber = Math.abs(page) || 1;
	const limitNumber = Math.abs(limit) || 30;
	const skip = (pageNumber - 1) * limitNumber;

	const key = ['products', { page, limit: limitNumber }];

	return useQuery<ProductList>(
		key,
		async () => {
			const { data } = await getFetcher<ProductList>(`/products?limit=${limitNumber}&skip=${skip}`);

			return data;
		},
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	);
};
