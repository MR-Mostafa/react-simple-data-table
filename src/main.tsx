import '~src/assets/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '~src/app';
import { ErrorBoundary } from '~src/features';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
