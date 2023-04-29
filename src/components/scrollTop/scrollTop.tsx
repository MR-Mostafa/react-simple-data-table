import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollTopProps {
	children: JSX.Element;
}

/**
 * @description
 * Scrolls to the top of the page with a smooth animation when the location changes.
 */
export const ScrollTop = ({ children }: ScrollTopProps) => {
	const { pathname, search } = useLocation();

	useEffect(() => {
		const id = setTimeout(() => {
			document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}, 0);

		return () => {
			clearTimeout(id);
		};
	}, [pathname, search]);

	return <>{children}</>;
};
