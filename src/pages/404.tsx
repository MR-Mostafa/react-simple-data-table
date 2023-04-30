import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Container className="py-5">
			<Row>
				<Col className="text-center">
					<p className="fs-1 fw-medium pb-4">404 Page</p>

					<Button variant="outline-secondary" type="button" onClick={() => navigate('/products')}>
						Go Back To Products Page
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default NotFound;
