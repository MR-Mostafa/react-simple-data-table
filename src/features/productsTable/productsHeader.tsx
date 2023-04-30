import { memo, useCallback } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { InputsStateType } from '~src/pages/products';

interface ProductsHeaderProps {
	values: InputsStateType;
	setValues: ({ value, name }: { value: string; name: string }) => void;
}

export const ProductsHeader = memo(({ values, setValues }: ProductsHeaderProps) => {
	const handleOnChange = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
		const { target } = e;

		const value: string = target.value?.trim() || '';
		const name: string = target.name;

		setValues({ value, name });
	}, []);

	return (
		<Form onChange={handleOnChange}>
			<Row>
				<Col xs={12} md={5}>
					<Row>
						<Col xs={12} md={5} className="pb-4 pb-md-0">
							<Form.Select aria-label="Search in column" name="searchBy" defaultValue={values.searchBy}>
								<option disabled>Search in column</option>
								<option value="id">ID</option>
								<option value="category">Category</option>
								<option value="title">Title</option>
								<option value="price">Price</option>
							</Form.Select>
						</Col>

						<Col xs={12} md={7} className="pb-4 pb-md-0">
							<Form.Control
								type="text"
								inputMode="text"
								placeholder="Enter the text"
								name="searchText"
								defaultValue={values.searchText}
								autoFocus
							/>
						</Col>
					</Row>
				</Col>

				<Col xs={12} md={{ offset: 5, span: 2 }}>
					<Form.Select aria-label="Number of rows" name="limit" defaultValue={values.limit}>
						<option disabled>Number of rows</option>
						<option value="5">5</option>
						<option value="12">12</option>
						<option value="30">30</option>
					</Form.Select>
				</Col>
			</Row>
		</Form>
	);
});
