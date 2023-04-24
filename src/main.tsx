import '~src/assets/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '~src/features';

import router from './router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
