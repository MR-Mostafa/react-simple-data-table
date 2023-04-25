import styled from './tableHeader.module.scss';

import { ReactElement, memo } from 'react';
import Button from 'react-bootstrap/Button';
import { THProps, TRProps } from 'react-html-props';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

import cx from 'classnames';

export interface TableHeaderList {
	text: string;
	onSort?: (sortBy: string) => void;
	sortType?: (sortBy: string) => 'asc' | 'des' | undefined;
	width?: string;
}
interface TableHeaderProps {
	list: TableHeaderList[];
	trProps?: Pick<TRProps, 'className'>;
	thProps?: Pick<THProps, 'colSpan' | 'abbr' | 'headers' | 'rowSpan' | 'scope' | 'className'>;
}

const DEFAULT_CLASS =
	'px-3 py-4 d-flex align-items-center justify-content-center gap-4 w-100 fs-6 fw-bold border-0 bg-transparent text-black rounded-0';

export const TableHeader = memo(({ list, thProps, trProps }: TableHeaderProps): ReactElement<HTMLTableSectionElement> => {
	return (
		<thead className={styled.thead}>
			<tr {...trProps}>
				{list.map((item, index) => {
					return (
						<th key={index} {...thProps} style={item.width ? { width: item.width } : {}}>
							{item.onSort ? (
								<Button
									className={cx(styled.btnSort, DEFAULT_CLASS, {
										[styled.activeSort]: item?.sortType?.(item.text.toLowerCase()),
									})}
									type="button"
									onClick={() => {
										item.onSort?.(item.text.toLowerCase());
									}}
								>
									{item.text}
									<span className="d-flex flex-column justify-content-center align-items-center sort-icons">
										<FaSortUp className={cx({ active: item?.sortType?.(item.text.toLowerCase()) === 'asc' })} />
										<FaSortDown className={cx({ active: item?.sortType?.(item.text.toLowerCase()) === 'des' })} />
									</span>
								</Button>
							) : (
								<span className={DEFAULT_CLASS}>{item.text}</span>
							)}
						</th>
					);
				})}
			</tr>
		</thead>
	);
});
