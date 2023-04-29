import { memo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currentProductPageState, getProductCountState } from '~src/atom';
import { Pagination } from '~src/components';

interface ProductsFooterProps {
	limit: number;
}

export const ProductsFooter = memo(({ limit }: ProductsFooterProps) => {
	const { totalCount, totalPrice } = useRecoilValue(getProductCountState);
	const [page, setPage] = useRecoilState(currentProductPageState);

	return (
		<Row>
			<Col xs={12} md={6}>
				<div className="d-flex align-items-center justify-content-start pb-3">
					<p className="fw-bold pe-2">Total Price:</p>
					<p>
						{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(totalPrice)}
					</p>
				</div>
				<div className="d-flex align-items-center justify-content-start">
					<p className="fw-bold pe-2">Total Count:</p>
					<p>{new Intl.NumberFormat('en-GB', { style: 'decimal' }).format(totalCount)}</p>
				</div>
			</Col>

			<Col xs={12} md={6}>
				<div className="d-flex align-items-center justify-content-end h-100">
					{!!totalCount && <Pagination currentPage={page} totalPage={totalCount / limit} onChangePage={(moveTo) => setPage(moveTo)} />}
				</div>
			</Col>
		</Row>
	);
});
