import { ReactElement } from 'react';
import { TDProps } from 'react-html-props';

interface TableLoadingProps {
	tdProps?: Pick<TDProps, 'colSpan' | 'abbr' | 'headers' | 'rowSpan' | 'scope' | 'className'>;
}

export const TableEmpty = ({ tdProps }: TableLoadingProps): ReactElement<HTMLTableRowElement> => {
	return (
		<tr className="pe-none">
			<td {...tdProps}>
				<p className="fw-bold w-100 text-center py-4">Currently, there is no information available.</p>
			</td>
		</tr>
	);
};
