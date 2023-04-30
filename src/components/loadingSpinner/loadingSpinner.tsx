import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingSpinner = () => {
	return (
		<Container>
			<Row>
				<Col className="text-center py-5">
					<Spinner animation="border" variant="primary" />
				</Col>
			</Row>
		</Container>
	);
};
