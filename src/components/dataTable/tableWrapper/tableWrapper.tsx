import styled from './tableWrapper.module.scss';

import { ReactElement, forwardRef } from 'react';
import Table from 'react-bootstrap/Table';

import cx from 'classnames';

interface TableWrapperProps {
	children: ReactElement<HTMLTableSectionElement> | ReactElement<HTMLTableSectionElement>[];
	isTruncated?: boolean;
}

export const TableWrapper = forwardRef<HTMLTableElement, TableWrapperProps>(({ children, isTruncated = false }, ref) => {
	const classNames = cx(styled.table, { [styled.truncateTable]: isTruncated });

	return (
		<Table striped hover bordered responsive className={classNames} ref={ref}>
			{children}
		</Table>
	);
});
