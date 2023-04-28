import { ChangeEvent, memo, useCallback, useMemo, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { IoIosAddCircle } from 'react-icons/io';

import cx from 'classnames';

import { useAddNewProduct, useGetProductCategories } from '~src/services';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

enum InputsActionKind {
	CATEGORY = 'changeCategory',
	TITLE = 'changeTitle',
	PRICE = 'changePrice',
	DESCRIPTION = 'changeDescription',
}

interface InputsState {
	category: {
		isInvalid: boolean;
		value: string;
	};
	title: {
		isInvalid: boolean;
		value: string;
	};
	price: {
		isInvalid: boolean;
		value: string;
	};
	description: {
		isInvalid: boolean;
		value: string;
	};
}

interface InputsAction {
	type: InputsActionKind;
	payload: {
		isInvalid: boolean;
		value: string;
	};
}

const DEFAULT_INPUTS: InputsState = {
	category: {
		isInvalid: false,
		value: '',
	},
	title: {
		isInvalid: false,
		value: '',
	},
	price: {
		isInvalid: false,
		value: '',
	},
	description: {
		isInvalid: false,
		value: '',
	},
};

const inputsReducer = (state: InputsState, action: InputsAction) => {
	const { type, payload } = action;

	switch (type) {
		case InputsActionKind.CATEGORY:
			return {
				...state,
				category: payload,
			};
		case InputsActionKind.TITLE:
			return {
				...state,
				title: payload,
			};
		case InputsActionKind.PRICE:
			return {
				...state,
				price: payload,
			};
		case InputsActionKind.DESCRIPTION:
			return {
				...state,
				description: payload,
			};
		default:
			return state;
	}
};

export const InsertNewProducts = memo(() => {
	const { data: categories, isSuccess } = useGetProductCategories();
	const { mutate, isLoading } = useAddNewProduct();

	const [inputsState, inputsDispatch] = useReducer(inputsReducer, DEFAULT_INPUTS);

	const handleChangeInput = useCallback((e: ChangeEvent<HTMLSelectElement | FormControlElement>) => {
		const { target } = e;
		const value = target.value || '';
		const name = target.name.toUpperCase() as keyof typeof InputsActionKind;
		const pattern = target.getAttribute('pattern') ? RegExp(`${target.getAttribute('pattern')}`, 'gi') : undefined;

		const isInvalid = value && pattern && !pattern.test(value) ? true : false;

		inputsDispatch({ type: InputsActionKind[name], payload: { value, isInvalid } });
	}, []);

	const isDisabledBtn = useMemo<boolean>(() => {
		const inputsKeys = Object.keys(inputsState) as [keyof InputsState];

		return inputsKeys.some((key) => {
			const { value, isInvalid } = inputsState[key];

			return !value || isInvalid;
		});
	}, [inputsState]);

	return (
		<tr>
			<td className="text-center">#</td>
			<td>
				<Form.Select
					aria-label="Select a category"
					name="category"
					disabled={!isSuccess || isLoading}
					onChange={handleChangeInput}
					required
					{...inputsState.category}
				>
					<option disabled value="" hidden>
						Select a category
					</option>
					{isSuccess &&
						categories.map((item, index) => {
							return (
								<option value={item} key={index}>
									{item}
								</option>
							);
						})}
				</Form.Select>
			</td>

			<td>
				<Form.Control
					type="text"
					inputMode="text"
					placeholder="Product Name"
					name="title"
					disabled={!isSuccess || isLoading}
					onChange={handleChangeInput}
					pattern="^[\w\s.]+$"
					required
					{...inputsState.title}
				/>
			</td>

			<td>
				<Form.Control
					type="text"
					inputMode="text"
					placeholder="Product Price"
					name="price"
					disabled={!isSuccess || isLoading}
					onChange={handleChangeInput}
					pattern="^\d+(\.\d+)?$"
					required
					{...inputsState.price}
				/>
			</td>

			<td>
				<Form.Control
					type="text"
					inputMode="text"
					placeholder="Product Description"
					name="description"
					disabled={!isSuccess || isLoading}
					onChange={handleChangeInput}
					pattern="^[\w\s.]+$"
					required
					{...inputsState.description}
				/>
			</td>

			<td className="text-center">
				<Button
					className={cx('border-0', 'px-3', { 'pt-0 pb-1 fs-3': !isLoading, 'pb-0 pt-2': isLoading })}
					variant="outline-success"
					disabled={!isSuccess || isDisabledBtn || isLoading}
					onClick={() => {
						mutate({
							category: inputsState.category.value,
							title: inputsState.title.value,
							price: +inputsState.price.value,
							description: inputsState.description.value,
						});
					}}
				>
					{isLoading ? <Spinner animation="border" variant="dark" size="sm" /> : <IoIosAddCircle />}
				</Button>
			</td>
		</tr>
	);
});
