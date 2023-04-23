import { ReactElement } from 'react';

interface TableBodyProps {
	children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
}

export const TableBody = ({ children }: TableBodyProps) => {
	return <tbody>{children}</tbody>;
};
