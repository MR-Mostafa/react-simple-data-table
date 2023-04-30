import { LoaderFunctionArgs } from 'react-router-dom';

import { type QueryClient } from '@tanstack/react-query';

import { type ProductItem } from '~src/types';

import { getProductByID } from './products';

export const getProductByIDLoader = (queryClient: QueryClient) => {
	return async ({ params }: LoaderFunctionArgs) => {
		const { productId } = params;

		if (!productId) {
			throw new Error('The product ID is incorrect');
		}

		const query = getProductByID(productId);

		return queryClient.getQueryData<ProductItem>(query.queryKey) || (await queryClient.fetchQuery<ProductItem>(query));
	};
};
