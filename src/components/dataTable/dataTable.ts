import { TableBody } from './tableBody/tableBody';
import { TableEmpty } from './tableEmpty/tableEmpty';
import { TableError } from './tableError/tableError';
import { TableFooter } from './tableFooter/tableFooter';
import { TableHeader } from './tableHeader/tableHeader';
import { TableLoading } from './tableLoading/tableLoading';
import { TableWrapper } from './tableWrapper/tableWrapper';

export const Table = Object.assign(TableWrapper, {
	Header: TableHeader,
	Body: TableBody,
	Footer: TableFooter,
	Loading: TableLoading,
	Error: TableError,
	Empty: TableEmpty,
});
