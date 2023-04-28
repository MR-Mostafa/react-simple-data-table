import { atom, selector } from 'recoil';

import { type ProductItem } from '~src/types';

interface GetProductCount {
	totalPrice: number;
	totalCount: number;
}

/**
 * @description
 * Holds an array of filtered and sorted products objects.
 */
export const productsResultState = atom<ProductItem[]>({
	key: 'ProductsResult',
	default: [] as ProductItem[],
});

/**
 * @description
 * Calculates the total count and total price of products, based on the `productsResultState` atom.*/
export const getProductCountState = selector<GetProductCount>({
	key: 'getProductCount',
	get: ({ get }) => {
		const products = get(productsResultState);

		const totalPrice = products.reduce((acc: number, current) => {
			return acc + (current.price || 0);
		}, 0);

		return {
			totalCount: products.length,
			totalPrice,
		};
	},
});
