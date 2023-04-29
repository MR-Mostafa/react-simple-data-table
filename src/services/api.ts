/* eslint-disable github/no-then */
import axios, { AxiosRequestConfig } from 'axios';

export const API = axios.create({
	baseURL: import.meta.env.GB_BASE_URL,
	timeout: +import.meta.env.GB_TIMEOUT, // 15s
	headers: {
		'content-type': 'application/json',
	},
	responseType: 'json',
});

API.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
API.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export const getFetcher = <T>(url: string, config: AxiosRequestConfig = {}) => API.get<T>(url, config).then((res) => res);

export const postFetcher = <T, D = unknown>(url: string, data: D = {} as D, config: AxiosRequestConfig = {}) =>
	API.post<T>(url, data, config).then((res) => res);

export const deleteFetcher = <T>(url: string, config: AxiosRequestConfig = {}) => API.delete<T>(url, config).then((res) => res);
