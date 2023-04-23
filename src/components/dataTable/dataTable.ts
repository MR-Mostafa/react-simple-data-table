import { TableBody } from './tableBody/tableBody';
import { TableFooter } from './tableFooter/tableFooter';
import { TableHeader } from './tableHeader/tableHeader';
import { TableWrapper } from './tableWrapper/tableWrapper';

export const Table = Object.assign(TableWrapper, {
	Header: TableHeader,
	Body: TableBody,
	Footer: TableFooter,
});
