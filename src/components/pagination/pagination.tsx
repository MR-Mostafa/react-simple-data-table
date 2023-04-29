import styled from './pagination.module.scss';

import { useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { TbArrowBigLeftFilled, TbArrowBigRightFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';

import cx from 'classnames';

interface PaginationProps {
	totalPage: number;
	currentPage: number;
}

const START_PAGE = 1;

export const Pagination = ({ totalPage, currentPage }: PaginationProps) => {
	const [_pageParam, setPageParam] = useSearchParams();

	const status = useMemo(() => {
		return {
			isDisabledPrevPage: START_PAGE >= Math.ceil(currentPage),
			isDisabledNextPage: Math.ceil(currentPage) >= Math.ceil(totalPage),
		};
	}, [currentPage, totalPage]);

	const handleChangePage = useCallback(
		(moveTo: number) => {
			setPageParam((prev) => {
				return {
					...prev,
					page: moveTo,
				};
			});
		},
		[status]
	);

	return (
		<div className={cx(styled.pagination, 'd-inline-flex', 'flex-row', 'align-items-center', 'justify-content-center', 'gap-2')}>
			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={status.isDisabledPrevPage}
				onClick={() => handleChangePage(1)}
			>
				{START_PAGE}
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={status.isDisabledPrevPage}
				onClick={() => handleChangePage(Math.ceil(currentPage) - 1)}
			>
				<TbArrowBigLeftFilled />
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center btn-current" disabled>
				{Math.ceil(currentPage)}
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={status.isDisabledNextPage}
				onClick={() => handleChangePage(Math.ceil(currentPage) + 1)}
			>
				<TbArrowBigRightFilled />
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={status.isDisabledNextPage}
				onClick={() => handleChangePage(Math.ceil(totalPage))}
			>
				{Math.ceil(totalPage)}
			</Button>
		</div>
	);
};
