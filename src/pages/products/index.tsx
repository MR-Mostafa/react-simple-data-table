import { useMemo, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { ProductsTable } from '~src/features';
import { useGetAllProducts } from '~src/services';
import { ProductsKeys } from '~src/types';

interface SortStateType {
	sortBy?: string;
	sortType?: 'asc' | 'des';
}

const Products = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [activeSort, setActiveSort] = useState<SortStateType>({ sortBy: undefined, sortType: undefined });
	const { data, isLoading, isError, isSuccess } = useGetAllProducts({ page, limit });

	const sortHandler = useMemo(() => {
		if (!isSuccess) return undefined;

		return {
			onSort: (text: string) => {
				setActiveSort((prev) => {
					return { sortBy: text, sortType: prev.sortType && prev.sortType === 'des' ? 'asc' : 'des' };
				});
			},
			sortType: (text: string) => (activeSort.sortBy === text ? activeSort.sortType : undefined),
		};
	}, [isSuccess, activeSort]);

	const sortingData = useMemo(() => {
		const products = data?.products ? [...data.products] : [];

		if (!products || products.length === 0) return [];

		const { sortBy, sortType } = activeSort;

		return (() => {
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
		})();
	}, [activeSort, data]);

	return (
		<Container className="py-5">
			<Row>
				<Col>
					<ProductsTable
						isError={isError}
						isLoading={isLoading}
						isSuccess={isSuccess}
						productsData={sortingData}
						sortHandler={sortHandler}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
