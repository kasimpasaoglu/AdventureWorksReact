import { createContext, useEffect, useState } from "react";
import { Filters, Product } from "../types/product";
import { apiRequest } from "../infrastructure/requests";
import { Category, SubCategory } from "../types/categories";

const defaultFilters: Filters = {
    productCategoryId: undefined,
    productSubcategoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    selectedColors: [],
    sortBy: undefined,
    searchString: undefined,
    pageSize: undefined,
    pageNumber: undefined,
}


interface ShopContextType {
    colors: string[];
    fetchColors: (catId?: number, subCatId?: number) => Promise<void>;

    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;

    categories: Category[];
    fetchCategories: () => Promise<void>;

    subCategories: SubCategory[];
    fetchSubCategories: (catId: number) => Promise<void>;

    products: Product[];
}


const ShopContext = createContext<ShopContextType>({
    colors: [],
    fetchColors: async () => { },

    filters: defaultFilters,
    setFilters: () => undefined,

    categories: [],
    fetchCategories: async () => { },

    subCategories: [],
    fetchSubCategories: async () => { },

    products: [],
})

function ShopContextProvider({ children }: { children: React.ReactNode }) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [colors, setColors] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const fetchCategories = async () => {
        const data = await apiRequest<Category[]>("GET", "/category");
        setCategories(data);
        setFilters((prev) => ({
            ...prev,
            productSubcategoryId: undefined
        }))
    };

    const fetchSubCategories = async (catId: number) => {
        const data = await apiRequest<SubCategory[]>("GET", `/category/${catId}`);
        setSubCategories(data);
    };


    const fetchProducts = async (currentFilters: Filters) => {
        try {

            const params = new URLSearchParams();

            if (currentFilters.productCategoryId) params.append("productCategoryId", currentFilters.productCategoryId.toString());
            if (currentFilters.productSubcategoryId) params.append("productSubcategoryId", currentFilters.productSubcategoryId.toString());
            if (currentFilters.minPrice) params.append("minPrice", currentFilters.minPrice.toString());
            if (currentFilters.maxPrice) params.append("maxPrice", currentFilters.maxPrice.toString());
            if (currentFilters.searchString) params.append("searchString", currentFilters.searchString);
            if (currentFilters.sortBy) params.append("sortBy", currentFilters.sortBy);
            if (currentFilters.pageSize) params.append("pageSize", currentFilters.pageSize.toString());
            if (currentFilters.pageNumber) params.append("pageNumber", currentFilters.pageNumber.toString());
            if ((currentFilters.selectedColors ?? []).length > 0) {
                params.append("selectedColors", currentFilters.selectedColors!.join(","));
            }

            const queryString = params.toString();
            const apiUrl = `/product?${queryString}`; // API URL’si

            const data = await apiRequest<Product[]>("GET", apiUrl);
            setProducts(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const fetchColors = async (catId?: number, subCatId?: number) => {
        let endpoint = "/color";
        if (catId) {
            endpoint += `/${catId}`;
            if (subCatId) {
                endpoint += `/${subCatId}`;
            }
        }

        const colors = await apiRequest<string[]>("GET", endpoint);
        setColors(colors);
    };



    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts(filters); // debounce suresi doldugunda istek atilir
        }, 500);

        return () => clearTimeout(timeoutId); // onceki setTimeoutu temizleyerek gereksiz istekleri engelle
    }, [filters]);


    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            selectedColors: []
        }))
    }, [colors]) // colors listesi degisirse, secilen renkleri sifirla

    return (
        <ShopContext.Provider value={{ filters, setFilters, colors, fetchColors, categories, fetchCategories, subCategories, fetchSubCategories, products }}>
            {children}
        </ShopContext.Provider>
    )
}

export { ShopContext, ShopContextProvider }

