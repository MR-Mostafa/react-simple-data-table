import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type AddNewProductProps, type ProductItem, type ProductList } from '~src/types';

import { getFetcher, postFetcher } from './api';

/**
 * @description
 * Get a list of products and return them all.
 */
export const useGetAllProducts = () => {
	const key = ['products'];

	return useQuery<ProductList>(
		key,
		async () => {
			const { data } = await getFetcher<ProductList>('/products?limit=100');

			return data;
		},
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		}
	);
};

/**
 * @description
 * Get a list of product categories and return them all.
 */
export const useGetProductCategories = () => {
	const key = ['productCategories'];

	return useQuery<string[]>(
		key,
		async () => {
			const { data } = await getFetcher<string[]>('/products/categories');

			return data;
		},
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		}
	);
};

/**
 * @description
 * Add a new product to a list of products.
 */
export const useAddNewProduct = () => {
	const queryClient = useQueryClient();
	const key = ['products'];

	return useMutation({
		mutationFn: async (props: AddNewProductProps) => {
			const { data } = await postFetcher<ProductItem>('/products/add', props);

			return data;
		},
		onSuccess: (newData) => {
			queryClient.setQueryData<ProductList>(key, (prevData) => {
				if (!prevData) {
					return {
						limit: 100,
						products: [newData],
						skip: 0,
						total: 1,
					};
				}

				const { total, products } = prevData;

				return {
					...prevData,
					products: [...products, { ...newData, id: total + 1 }],
					total: total + 1,
				};
			});
		},
	});
};
