import { ReactElement } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { TDProps } from 'react-html-props';

interface TableLoadingProps {
	tdProps?: Pick<TDProps, 'colSpan' | 'abbr' | 'headers' | 'rowSpan' | 'scope' | 'className'>;
}

export const TableLoading = ({ tdProps }: TableLoadingProps): ReactElement<HTMLTableRowElement> => {
	return (
		<tr className="pe-none">
			<td {...tdProps}>
				<div className="text-center pt-4 pb-3">
					<Spinner animation="border" variant="primary" />
				</div>
			</td>
		</tr>
	);
};
