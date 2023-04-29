import { memo, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import cx from 'classnames';

import { useDeleteProduct } from '~src/services';
import { type ProductItem } from '~src/types';

interface ConfirmDeleteModalProps {
	isShow: boolean;
	handleClose: () => void;
	productItem: ProductItem;
}

/**
 * @description
 * Displays a modal dialog asking the user to confirm the deletion of a product item.
 */
export const ConfirmDeleteModal = memo(({ isShow, handleClose, productItem }: ConfirmDeleteModalProps) => {
	const { mutate: deleteProduct, isError, isLoading, isSuccess } = useDeleteProduct();

	useEffect(() => {
		if (isSuccess && (!isError || !isLoading)) {
			handleClose();
		}
	}, [isError, isLoading, isSuccess]);

	return (
		<Modal show={isShow} onHide={handleClose} centered scrollable backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>Are you sure</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p className="pb-1">Do you really want to delete this item?</p>
				<p className="py-2 fw-bold">Product Item:</p>
				<ul className="ms-3 list-unstyled">
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- ID:</span>
						<span className="flex-fill text-truncate">{productItem.id}</span>
					</li>
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- Title:</span>
						<span className="flex-fill text-truncate">{productItem.title}</span>
					</li>
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- Category:</span>
						<span className="flex-fill text-truncate">{productItem.category}</span>
					</li>
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- Price:</span>
						<span className="flex-fill text-truncate">
							{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(
								productItem.price
							)}
						</span>
					</li>
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- Description:</span>
						<span className="flex-fill text-truncate">{productItem.description}</span>
					</li>
					<li className="d-flex align-items-center justify-content-start flex-nowrap">
						<span className="pe-2 fw-bold flex-shrink-0">- Title:</span>
						<span className="flex-fill text-truncate">{productItem.title}</span>
					</li>
				</ul>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose} disabled={isLoading}>
					Cancel
				</Button>
				<Button
					className="position-relative"
					variant="danger"
					onClick={() => {
						deleteProduct(productItem.id);
					}}
					disabled={isLoading}
				>
					<span className={cx({ 'opacity-0': isLoading })}>Delete Item</span>

					{isLoading && (
						<Spinner animation="border" variant="light" size="sm" className="fs-6 position-absolute top-0 start-0 end-0 bottom-0 m-auto" />
					)}
				</Button>
			</Modal.Footer>
		</Modal>
	);
});
