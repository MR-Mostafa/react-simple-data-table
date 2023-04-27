import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { ProductsHeader, ProductsTable } from '~src/features';
import { ProductsKeys } from '~src/types';

export interface InputsStateType {
	limit: number;
	searchText: string;
	searchBy: ProductsKeys;
}

const Products = () => {
	const [page] = useState(1);
	const [inputs, setInputs] = useState<InputsStateType>({ limit: 30, searchText: '', searchBy: 'title' });

	return (
		<Container className="py-5">
			<Row>
				<Col xs={12}>
					<ProductsHeader values={inputs} setValues={setInputs} />
				</Col>

				<Col xs={12}>
					<ProductsTable page={page} limit={inputs.limit} searchBy={inputs.searchBy} searchText={inputs.searchText} />
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
