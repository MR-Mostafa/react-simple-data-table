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
			isDisabledPrevPage: START_PAGE >= Math.ceil(currentPage),
			isDisabledNextPage: Math.ceil(currentPage) >= Math.ceil(totalPage),
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
				{Math.ceil(currentPage)}
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledNextPage}>
				<TbArrowBigRightFilled />
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center" disabled={status.isDisabledNextPage}>
				{Math.ceil(totalPage)}
			</Button>
		</div>
	);
});
