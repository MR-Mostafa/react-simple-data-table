import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './errorFallback';

interface ErrorBoundaryProps {
	children: ReactNode;
}

/**
 * @description
 * A component that renders an error boundary with a fallback component for error handling.
 */
export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
	return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};
