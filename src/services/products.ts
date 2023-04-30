import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type AddNewProductProps, type ProductItem, type ProductList } from '~src/types';

import { deleteFetcher, getFetcher, postFetcher, putFetcher } from './api';

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
export const useAddNewProduct = ({ onSuccess = undefined }: { onSuccess?: () => void }) => {
	const queryClient = useQueryClient();
	const key = ['products'];

	return useMutation({
		mutationFn: async (props: AddNewProductProps) => {
			const { data } = await postFetcher<ProductItem>('/products/add', props);

			return data;
		},
		onSuccess: (newData) => {
			if (onSuccess && typeof onSuccess === 'function') {
				onSuccess();
			}

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

				const lastId = products[products.length - 1].id;

				return {
					...prevData,
					products: [...products, { ...newData, id: lastId + 1 }],
					total: total + 1,
				};
			});
		},
	});
};

/**
 * @description
 * Delete a product and updates the query data accordingly.
 */
export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	const key = ['products'];

	return useMutation({
		mutationFn: async (productId: number) => {
			const { data } = await deleteFetcher<ProductItem>(`/products/${productId}`);

			return data;
		},

		/**
		 * `onSettled` method was used for the following reasons:
		 *  - As stated in the document, "we are required to remove the product."
		 *  - For products that have been added by the user. It gives an error because the server doesn't have these products, but they exist on the client.
		 */
		onSettled: (_product, _err, productId) => {
			queryClient.setQueryData<ProductList>(key, (prevData) => {
				if (!prevData) return;

				const { total, products } = prevData;

				const removedProduct = products.filter((item) => item.id !== productId);

				return {
					...prevData,
					products: removedProduct,
					total: total - 1,
				};
			});
		},
	});
};

/**
 * @description
 * Get a list of products and return them all.
 */
export const getProductByID = (productId: string) => {
	return {
		queryKey: [`product-${productId}`],
		queryFn: async () => {
			const { data } = await getFetcher<ProductItem>(`/products/${productId}`);

			return data;
		},
	};
};

/**
 * @description
 * Edit a product and updates the query data accordingly.
 */
export const useEditProduct = () => {
	const queryClient = useQueryClient();
	const key = ['products'];

	return useMutation({
		mutationFn: async ({ productId, body }: { productId: string; body: { price: number } }) => {
			const { data } = await putFetcher<ProductItem>(`/products/${productId}`, body);

			return data;
		},
		onSuccess: (newData) => {
			queryClient.setQueryData<ProductList>(key, (prevData) => {
				if (!prevData) return;

				const { products } = prevData;

				return {
					...prevData,
					products: products.map((item) => {
						if (item.id === newData.id) {
							return { ...item, ...newData };
						}

						return item;
					}),
				};
			});
		},
	});
};
