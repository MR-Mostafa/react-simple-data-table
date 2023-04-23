import styled from './pagination.module.scss';

import { memo, useMemo } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { TbArrowBigLeftFilled, TbArrowBigRightFilled } from 'react-icons/tb';

import cx from 'classnames';

interface PaginationProps {
	totalPage: number;
	currentPage: number;
}

const START_PAGE = 1;

export const Pagination = memo(({ totalPage, currentPage }: PaginationProps) => {
	const status = useMemo(() => {
		return {
			isDisabledPrevPage: START_PAGE >= currentPage,
			isDisabledNextPage: currentPage >= totalPage,
		};
	}, [currentPage, totalPage]);

	return (
		<div className={cx(styled.pagination, 'd-inline-flex', 'flex-row', 'align-items-center', 'justify-content-center', 'gap-2')}>
			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledPrevPage}>
				{START_PAGE}
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledPrevPage}>
				<TbArrowBigLeftFilled />
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center btn-current" disabled>
				{currentPage}
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledNextPage}>
				<TbArrowBigRightFilled />
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledNextPage}>
				{totalPage}
			</Button>
		</div>
	);
});
