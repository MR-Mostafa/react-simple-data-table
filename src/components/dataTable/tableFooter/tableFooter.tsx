import { ReactElement } from 'react';

interface TableFooterProps {
	children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
}

export const TableFooter = ({ children }: TableFooterProps): ReactElement<HTMLTableSectionElement> => {
	return <tfoot>{children}</tfoot>;
};
