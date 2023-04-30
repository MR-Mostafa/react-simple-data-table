import styled from './pagination.module.scss';

import { useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { TbArrowBigLeftFilled, TbArrowBigRightFilled } from 'react-icons/tb';

import cx from 'classnames';

import { useChangeSearchParams } from '~src/hooks';

interface PaginationProps {
	totalPage: number;
	currentPage: number;
	onChangePage: (moveTo: number) => void;
}

const START_PAGE = 1;

export const Pagination = ({ totalPage, currentPage, onChangePage }: PaginationProps) => {
	const [searchParam, setSearchParam] = useChangeSearchParams();

	const page = useMemo(() => {
		const total = Math.ceil(totalPage);
		const current = Math.ceil(currentPage) > total ? total : Math.ceil(currentPage);

		return {
			currentPage: current,
			totalPage: total,
			isDisabledPrevPage: START_PAGE >= current,
			isDisabledNextPage: current >= total,
		};
	}, [currentPage, totalPage]);

	const handleChangePage = (moveTo: number) => {
		onChangePage(moveTo);
		setSearchParam<{ page: number }>({ page: moveTo });
	};

	/* Update the current page number based on the value of the `page` query parameter in the URL. */
	useEffect(() => {
		const pageNumber = searchParam.get('page') || `${currentPage}`;
		handleChangePage(+pageNumber);
	}, []);

	/**
	 * This is ensuring that the current page number is always within the valid range of available pages.
	 *  - If the current page is less than 1, it sets the page number to 1.
	 *  - If the `totalCount` is not available, it returns.
	 *  - If the current page is greater than the total number of pages, it sets the page number to the last page.
	 */
	useEffect(() => {
		const current = Math.ceil(currentPage);
		const total = Math.ceil(totalPage);

		if (current < 1) {
			handleChangePage(1);
			return;
		}

		if (current > total) {
			handleChangePage(total);
		}
	}, [totalPage, currentPage]);

	return (
		<div className={cx(styled.pagination, 'd-inline-flex', 'flex-row', 'align-items-center', 'justify-content-center', 'gap-2')}>
			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={page.isDisabledPrevPage}
				onClick={() => handleChangePage(1)}
			>
				{START_PAGE}
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={page.isDisabledPrevPage}
				onClick={() => handleChangePage(page.currentPage - 1)}
			>
				<TbArrowBigLeftFilled />
			</Button>

			<Button type="button" className="p-2 d-flex align-items-center justify-content-center btn-current" disabled>
				{page.currentPage}
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={page.isDisabledNextPage}
				onClick={() => handleChangePage(page.currentPage + 1)}
			>
				<TbArrowBigRightFilled />
			</Button>

			<Button
				type="button"
				className="p-2 d-flex align-items-center justify-content-center"
				disabled={page.isDisabledNextPage}
				onClick={() => handleChangePage(page.totalPage)}
			>
				{page.totalPage}
			</Button>
		</div>
	);
};
