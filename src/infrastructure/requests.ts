import axios, { AxiosRequestConfig, Method } from "axios";
import { Filters, Product } from "../types/product";
import { Category, SubCategory } from "../types/categories";

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

// Son eklenen ürünleri yükleme
export const loadRecents = async (): Promise<Product[]> => {
    return await apiRequest<Product[]>("GET", "/product/recent");
};

// Ürün listesini yükleme
export const fetchProductList = async (
    requestBody: Filters
): Promise<Product[]> => {
    return await apiRequest<Product[], Filters>("POST", "/Product", requestBody);
};

// Kategorileri yükleme
export const loadCategories = async (): Promise<Category[]> => {
    return await apiRequest<Category[]>("GET", "/category");
};

// Alt kategorileri yükleme
export const loadSubCategories = async (categoryId: string): Promise<SubCategory[]> => {
    return await apiRequest<SubCategory[]>("GET", `/category/${categoryId}`);
};

export const getColors = async (
    selectedCategory: number,
    selectedSubCategory: number,
): Promise<string[]> => {
    let endpoint = `/color`;
    if (selectedCategory && selectedSubCategory) {
        endpoint += `/${selectedCategory}/${selectedSubCategory}`;
    } else if (selectedCategory) {
        endpoint += `/${selectedCategory}`;
    }
    return await apiRequest<string[]>("GET", endpoint);
};



export default apiClient;
