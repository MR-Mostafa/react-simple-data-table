import { ReactElement } from 'react';

interface TableBodyProps {
	children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
}

export const TableBody = ({ children }: TableBodyProps): ReactElement<HTMLTableSectionElement> => {
	return <tbody>{children}</tbody>;
};
