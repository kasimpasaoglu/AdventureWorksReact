import axios, { AxiosRequestConfig, Method } from "axios";
import { Product } from "../types/product";


// Axios istemcisi
const apiClient = axios.create({
    baseURL: "http://adventureworksapi.runasp.net/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});



// Genel API istegi
export const apiRequest = async <T, K = unknown>(
    method: Method,
    endpoint: string,
    data?: K,
    params?: Record<string, unknown>
): Promise<T> => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            data,
            params
        };
        const response = await apiClient(config);
        return response.data as T;
    } catch (error: any) {
        console.error(`Error in API request: ${error.message}`);
        throw error;
    }
};


// Tek ürün getirme
export const getSingleProductById = async (productId: string): Promise<Product> => {
    return await apiRequest<Product>("GET", `/product/${productId}`);
};

export default apiClient;
