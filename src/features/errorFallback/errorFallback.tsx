import type { FallbackProps } from 'react-error-boundary';

/**
 * @description
 * Displays an error message and stack trace in case of an error.
 */
export const ErrorFallback = ({ error }: FallbackProps) => {
	return (
		<div className="container">
			<div className="row min-vh-100 align-content-center py-5">
				<div className="col-12">
					<div role="alert" className="alert alert-danger">
						<div className="p-[2rem] br-[0.5rem] bg-[#f1d8d5] bxs-[0px_1px_2px_1px_#bdbdbd]">
							<p className="fw-bold pb-4">Something went wrong:</p>
							<pre className="mb-4">
								<code>{error.message}</code>
							</pre>
							<pre>
								<code>{error.stack}</code>
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
