import { type ConfigEnv, defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
	const isDevMode = config.mode === 'development';

	return {
		plugins: [
			react(),
			chunkSplitPlugin({
				strategy: 'single-vendor',
				customSplitting: {
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
				},
			}),
		],
		esbuild: {
			jsxInject: `import React from 'react'`,
		},
		css: {
			devSourcemap: isDevMode,
			preprocessorOptions: {
				sass: {
					javascriptEnabled: true,
				},
			},
		},
		resolve: {
			alias: {
				'~src': resolve(__dirname, 'src'),
			},
		},
		envDir: resolve(__dirname, 'src', 'env'),
		envPrefix: 'GB_',
		server: {
			proxy: {
				/**
				 * When we use proxy API requests, we can get data from an external website that throws an error by default (if we don't use a proxy)
				 * https://localhost:3000/api/**  ->  https://jsonplaceholder.typicode.com/**
				 *
				 * @example
				 * 	https://localhost:3000/api/todos/1  ->  https://jsonplaceholder.typicode.com/todos/1
				 **/
				'/api/': {
					target: 'https://dummyjson.com/',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
