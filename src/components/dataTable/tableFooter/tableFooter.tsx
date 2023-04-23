import { ReactElement } from 'react';

interface TableFooterProps {
	children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
}

export const TableFooter = ({ children }: TableFooterProps) => {
	return <tfoot>{children}</tfoot>;
};
