/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly GB_BASE_URL: string;
	readonly GB_TIMEOUT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
