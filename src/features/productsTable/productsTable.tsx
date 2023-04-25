import { memo, useMemo } from 'react';

import { Table } from '~src/components';
import { ProductItem } from '~src/types';

interface ProductsTableProps {
	productsData: ProductItem[];
	sortHandler?: {
		onSort: (text: string) => void;
		sortType: (text: string) => 'asc' | 'des' | undefined;
	};
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}

export const ProductsTable = memo(({ productsData, sortHandler, isLoading, isError, isSuccess }: ProductsTableProps) => {
	const tableHeaderList = useMemo(() => {
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
	}, [sortHandler]);

	return (
		<Table isTruncated>
			<Table.Header list={tableHeaderList} />
			<Table.Body>
				<>
					{isLoading && <Table.Loading tdProps={{ colSpan: 6 }} />}

					{isError && <Table.Error tdProps={{ colSpan: 6 }} />}

					{isSuccess && productsData.length === 0 && <Table.Empty tdProps={{ colSpan: 6 }} />}

					{isSuccess &&
						productsData.length !== 0 &&
						productsData.map((item) => {
							return (
								<tr key={item.id}>
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
		</Table>
	);
});
