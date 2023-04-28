import { memo, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { v4 as uuidv4 } from 'uuid';

import { productsResultState } from '~src/atom';
import { Table } from '~src/components';
import { InsertNewProducts } from '~src/features';
import { useGetAllProducts } from '~src/services';
import { type ProductItem, type ProductsKeys } from '~src/types';

interface SortStateType {
	sortBy?: string;
	sortType?: 'asc' | 'des';
}
interface ProductsTableProps {
	page: number;
	limit: number;
	searchBy?: ProductsKeys;
	searchText?: string;
}

/**
 * @description
 * Displays a table of products based on the current page, limit, search query, and sort order.
 **/
export const ProductsTable = memo(({ page, limit, searchBy, searchText }: ProductsTableProps) => {
	const [activeSort, setActiveSort] = useState<SortStateType>({ sortBy: undefined, sortType: undefined });
	const { data, isLoading, isError, isSuccess } = useGetAllProducts();
	const setProductResultState = useSetRecoilState(productsResultState);

	const tableHeaderList = useMemo(() => {
		const sortHandler = (() => {
			if (!isSuccess) return undefined;

			return {
				onSort: (text: string) => {
					setActiveSort((prev) => {
						return { sortBy: text, sortType: prev.sortType && prev.sortType === 'des' ? 'asc' : 'des' };
					});
				},
				sortType: (text: string) => (activeSort.sortBy === text ? activeSort.sortType : undefined),
			};
		})();

		return [
			{
				text: 'ID',
				onSort: sortHandler?.onSort,
				sortType: sortHandler?.sortType,
				width: '7%',
			},
			{
				text: 'Category',
				onSort: sortHandler?.onSort,
				sortType: sortHandler?.sortType,
				width: '16%',
			},
			{
				text: 'Title',
				onSort: sortHandler?.onSort,
				sortType: sortHandler?.sortType,
				width: '23%',
			},
			{
				text: 'Price',
				onSort: sortHandler?.onSort,
				sortType: sortHandler?.sortType,
				width: '12%',
			},
			{ text: 'Description', width: '30%' },
			{ text: 'Action', width: '12%' },
		];
	}, [isSuccess, activeSort]);

	/**
	 * 1. Sorts an array of products based on a specified sort key and sort type.
	 **/
	const sortProducts = useMemo<ProductItem[]>(() => {
		const products = data?.products ? [...data.products] : [];

		if (!products || products.length === 0) return [];

		const { sortBy, sortType } = activeSort;

		if (!sortBy || !sortType) return products;

		return products.sort((a, b) => {
			const valA = a[sortBy as ProductsKeys];
			const valB = b[sortBy as ProductsKeys];

			if (typeof valA === 'number' && typeof valB === 'number') {
				return activeSort.sortType === 'asc' ? valA - valB : valB - valA;
			}

			const options = { sensitivity: 'base', usage: 'sort', ignorePunctuation: true };

			return activeSort.sortType === 'asc'
				? valA.toString().localeCompare(valB.toString(), undefined, options)
				: valB.toString().localeCompare(valA.toString(), undefined, options);
		});
	}, [activeSort, data]);

	/**
	 * 2. Filters products based on a search query.
	 */
	const filterProducts = useMemo<ProductItem[]>(() => {
		if (!searchBy || !searchText) return sortProducts;

		return sortProducts.filter((item) => {
			const columnItem = item[searchBy].toString().trim().toLowerCase();

			return columnItem.includes(searchText);
		});
	}, [sortProducts, searchText]);

	/**
	 * 3. Calculates the portion of the filtered and sorted products array to be displayed based on the current page and limit.
	 **/
	const paginationProducts = useMemo<ProductItem[]>(() => {
		const start = (page - 1) * limit;
		const end = limit * page;

		return filterProducts.slice(start, end);
	}, [filterProducts, page, limit]);

	useEffect(() => {
		setProductResultState(filterProducts);
	}, [paginationProducts]);

	return (
		<Table isTruncated>
			<Table.Header list={tableHeaderList} />

			<Table.Body>
				<>
					{isLoading && <Table.Loading tdProps={{ colSpan: 6 }} />}

					{isError && <Table.Error tdProps={{ colSpan: 6 }} />}

					{isSuccess && paginationProducts.length === 0 && <Table.Empty tdProps={{ colSpan: 6 }} />}

					{isSuccess &&
						paginationProducts.length !== 0 &&
						paginationProducts.map((item) => {
							const uuid = uuidv4();

							return (
								<tr key={uuid}>
									<td className="text-center">{new Intl.NumberFormat('en-GB', { style: 'decimal' }).format(item.id)}</td>
									<td>{item.category}</td>
									<td>{item.title}</td>
									<td>
										{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(
											item.price
										)}
									</td>
									<td>{item.description}</td>
									<td></td>
								</tr>
							);
						})}
				</>
			</Table.Body>

			<Table.Footer>
				<InsertNewProducts />
			</Table.Footer>
		</Table>
	);
});
