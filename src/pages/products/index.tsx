import { useDeferredValue, useLayoutEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSearchParams } from 'react-router-dom';

import { ProductsFooter, ProductsHeader, ProductsTable } from '~src/features';
import { ProductsKeys } from '~src/types';

export interface InputsStateType {
	limit: number;
	searchText: string;
	searchBy: ProductsKeys;
}

const Products = () => {
	const [searchParam, _setSearchParam] = useSearchParams();
	const [page, setPage] = useState<number>(1);
	const [inputs, setInputs] = useState<InputsStateType>({ limit: 30, searchText: '', searchBy: 'title' });

	useLayoutEffect(() => {
		const pageParam = searchParam.get('page') || '1';

		setPage(+pageParam);
	}, [searchParam]);

	const deferredInputs = useDeferredValue(inputs);

	return (
		<Container className="py-5">
			<Row>
				<Col xs={12}>
					<ProductsHeader
						values={inputs}
						setValues={({ name, value }) => {
							setInputs((prev) => {
								return {
									...prev,
									[name]: Number.isNaN(+value) ? value.toLowerCase() : +value,
								};
							});
						}}
					/>
				</Col>

				<Col xs={12}>
					<ProductsTable
						page={page}
						limit={deferredInputs.limit}
						searchBy={deferredInputs.searchBy}
						searchText={deferredInputs.searchText}
					/>
				</Col>

				<Col xs={12}>
					<ProductsFooter page={page} limit={deferredInputs.limit} />
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
