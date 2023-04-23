import styled from './tableWrapper.module.scss';

import { ReactElement, forwardRef } from 'react';
import Table from 'react-bootstrap/Table';

interface TableWrapperProps {
	children: ReactElement<HTMLTableSectionElement> | ReactElement<HTMLTableSectionElement>[];
}

export const TableWrapper = forwardRef<HTMLTableElement, TableWrapperProps>(({ children }, ref) => {
	return (
		<Table striped hover bordered responsive className={styled.table} ref={ref}>
			{children}
		</Table>
	);
});
