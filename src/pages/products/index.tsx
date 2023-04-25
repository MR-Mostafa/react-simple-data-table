import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { ProductsTable } from '~src/features';

const Products = () => {
	return (
		<Container className="py-5">
			<Row>
				<Col>
					<ProductsTable />
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
