import { lazy as ReactLazy, Suspense as ReactSuspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LoadingSpinner, ScrollTop } from '~src/components';
import NotFound from '~src/pages/404';

const ProductsPage = ReactLazy(() => import('~src/pages/products'));
const ProductsIdPage = ReactLazy(() => import('~src/pages/products/[id]'));

const router = createBrowserRouter([
	{
		path: '/products',
		element: (
			<ReactSuspense fallback={<LoadingSpinner />}>
				<ScrollTop>
					<ProductsPage />
				</ScrollTop>
			</ReactSuspense>
		),
	},
	{
		path: '/products/:id',
		element: (
			<ReactSuspense fallback={<LoadingSpinner />}>
				<ScrollTop>
					<ProductsIdPage />
				</ScrollTop>
			</ReactSuspense>
		),
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
