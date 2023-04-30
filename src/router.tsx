import { lazy as ReactLazy, Suspense as ReactSuspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { type QueryClient } from '@tanstack/react-query';

import { LoadingSpinner, RedirectTo, ScrollTop } from '~src/components';
import NotFound from '~src/pages/404';
import { getProductByIDLoader } from '~src/services';

const ProductsPage = ReactLazy(() => import('~src/pages/products'));
const ProductDetails = ReactLazy(() => import('~src/pages/products/[productId]'));

const router = (queryClient: QueryClient) =>
	createBrowserRouter([
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
			path: '/products/:productId',
			element: (
				<ReactSuspense fallback={<LoadingSpinner />}>
					<ScrollTop>
						<ProductDetails />
					</ScrollTop>
				</ReactSuspense>
			),
			errorElement: <RedirectTo to="/404" />,
			loader: getProductByIDLoader(queryClient), //
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

export default router;
