import { memo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useRecoilValue } from 'recoil';

import { getProductCountState } from '~src/atom';
import { Pagination } from '~src/components';

interface ProductsFooterProps {
	page: number;
	limit: number;
}

export const ProductsFooter = memo(({ page, limit }: ProductsFooterProps) => {
	const productInfo = useRecoilValue(getProductCountState);

	return (
		<Row>
			<Col xs={12} md={6}>
				<div className="d-flex align-items-center justify-content-start pb-3">
					<p className="fw-bold pe-2">Total Price:</p>
					<p>
						{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(
							productInfo.totalPrice
						)}
					</p>
				</div>
				<div className="d-flex align-items-center justify-content-start">
					<p className="fw-bold pe-2">Total Count:</p>
					<p>{new Intl.NumberFormat('en-GB', { style: 'decimal' }).format(productInfo.totalCount)}</p>
				</div>
			</Col>

			<Col xs={12} md={6}>
				<div className="d-flex align-items-center justify-content-end h-100">
					{!!productInfo.totalCount && <Pagination currentPage={page} totalPage={productInfo.totalCount / limit} />}
				</div>
			</Col>
		</Row>
	);
});
