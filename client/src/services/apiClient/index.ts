/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = (response: AxiosResponse) => response.data;

const handleError = (error: any) => {
  return Promise.reject(error.response?.data || error.message);
};

const get = (url: string, config?: AxiosRequestConfig) => apiClient.get(url, config).then(handleResponse).catch(handleError);

const post = (url: string, data: any, config?: AxiosRequestConfig) => apiClient.post(url, data, config).then(handleResponse).catch(handleError);

const patch = (url: string, data: any, config?: AxiosRequestConfig) => apiClient.patch(url, data, config).then(handleResponse).catch(handleError);

const del = (url: string, config?: AxiosRequestConfig) => apiClient.delete(url, config).then(handleResponse).catch(handleError);

export { get, post, patch, del };
