import { useSearchParams } from 'react-router-dom';

type NewParamsType<T> = {
	[Property in keyof T]: T[keyof T];
};

/**
 * @description
 * A hook that allows for changing search parameters in a URL.
 */
export const useChangeSearchParams = () => {
	const [searchParam, setSearchParam] = useSearchParams();

	const handleChangeSearchParam = <T>(newParams: NewParamsType<T>) => {
		return setSearchParam((prev) => {
			for (const [key, value] of Object.entries(newParams)) {
				if (!value) {
					prev.delete(key);
					continue;
				}

				prev.set(key, `${value}`);
			}

			return prev;
		});
	};

	return [searchParam, handleChangeSearchParam] as const;
};
