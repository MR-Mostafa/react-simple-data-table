import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getProductByID, useEditProduct } from '~src/services';

const ProductDetails = () => {
	const { productId } = useParams() as { productId: string };
	const { data } = useQuery(getProductByID(productId));
	const { mutate: editProduct, isLoading, isSuccess, isError } = useEditProduct();
	const [price, setPrice] = useState<number>(data?.price || 0);
	const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isError) return;

		setShowErrorDialog(true);
	}, [isError]);

	useEffect(() => {
		if (!isSuccess) return;

		navigate('/products');
	}, [isSuccess]);

	const handleCloseErrorDialog = useCallback(() => {
		setShowErrorDialog(false);
	}, []);

	return (
		<>
			<Container className="py-5">
				<Row>
					<Col xs={12} className="pt-5">
						<FloatingLabel controlId="productName" label="Product Name" className="mb-3">
							<Form.Control
								inputMode="text"
								placeholder="Product Name"
								name="title"
								pattern="^[\w\s.]+$"
								required
								defaultValue={data?.title}
								disabled
							/>
						</FloatingLabel>

						<FloatingLabel controlId="productPrice" label="Product Price" className="mb-3">
							<Form.Control
								inputMode="decimal"
								placeholder="Product Price"
								name="price"
								pattern="^\d+(\.\d+)?$"
								required
								value={price}
								onChange={(e) => {
									const { value } = e.target;
									const priceValue = +value;

									if (Number.isNaN(priceValue)) return;

									setPrice(priceValue);
								}}
							/>
						</FloatingLabel>

						<FloatingLabel controlId="productPrice" label="Product Category" className="mb-3">
							<Form.Control
								inputMode="decimal"
								placeholder="Product Price"
								name="price"
								pattern="^\d+(\.\d+)?$"
								required
								defaultValue={data?.category}
								disabled
							/>
						</FloatingLabel>
					</Col>

					<Col>
						<div className="d-flex aligns-items-center justify-content-end gap-3 pt-3">
							<Button
								variant="light"
								className="border-1 border-secondary border-opacity-50"
								disabled={isLoading}
								onClick={() => {
									navigate('/products');
								}}
							>
								Skip
							</Button>

							<Button
								variant="primary"
								disabled={isLoading || isSuccess || isError}
								onClick={() => {
									editProduct({ productId, body: { price } });
								}}
							>
								Save & Continue
							</Button>
						</div>
					</Col>
				</Row>
			</Container>

			{showErrorDialog && (
				<Modal show={showErrorDialog} onHide={handleCloseErrorDialog} centered scrollable backdrop="static">
					<Modal.Header closeButton>
						<Modal.Title>Something Wrong</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>An error has occurred</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseErrorDialog}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};

export default ProductDetails;
