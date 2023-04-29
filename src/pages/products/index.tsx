import { useDeferredValue, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { ProductsFooter, ProductsHeader, ProductsTable } from '~src/features';
import { useChangeSearchParams } from '~src/hooks';
import { ProductsKeys } from '~src/types';

export interface InputsStateType {
	limit: number;
	searchText: string;
	searchBy: ProductsKeys;
}

const Products = () => {
	const [searchParam, setSearchParam] = useChangeSearchParams();
	const [inputs, setInputs] = useState<InputsStateType>({
		limit: searchParam.get('limit') ? +searchParam.get('limit')! : 30,
		searchText: searchParam.get('searchText') || '',
		searchBy: (searchParam.get('searchBy') || 'title') as ProductsKeys,
	});

	const deferredInputs = useDeferredValue(inputs);

	/* Update the search parameters in the URL */
	useEffect(() => {
		setSearchParam<InputsStateType>(deferredInputs);
	}, [deferredInputs]);

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
					<ProductsTable limit={deferredInputs.limit} searchBy={deferredInputs.searchBy} searchText={deferredInputs.searchText} />
				</Col>

				<Col xs={12}>
					<ProductsFooter limit={deferredInputs.limit} />
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
