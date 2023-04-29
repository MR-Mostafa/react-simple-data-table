import { ReactElement } from 'react';
import { TDProps } from 'react-html-props';

interface TableLoadingProps {
	tdProps?: Pick<TDProps, 'colSpan' | 'abbr' | 'headers' | 'rowSpan' | 'scope' | 'className'>;
}

export const TableError = ({ tdProps }: TableLoadingProps): ReactElement<HTMLTableRowElement> => {
	return (
		<tr className="pe-none">
			<td {...tdProps}>
				<p className="fw-bold w-100 text-center text-danger py-4">Unfortunately, there was an error.</p>
			</td>
		</tr>
	);
};
