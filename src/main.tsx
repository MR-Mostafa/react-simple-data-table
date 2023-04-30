import '~src/assets/styles/index.scss';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorBoundary } from '~src/features';

import { ONE_MINUTE } from './constant';
import router from './router';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 7 * ONE_MINUTE,
			cacheTime: 10 * ONE_MINUTE,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ErrorBoundary>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router(queryClient)} />

					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</RecoilRoot>
		</ErrorBoundary>
	</StrictMode>
);
