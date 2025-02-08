import { createContext, useEffect, useRef, useState } from "react";
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
    pageNumber: 1,
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

    isFetching: boolean
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
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

    isFetching: false,
    setIsFetching: () => undefined,
})

function ShopContextProvider({ children }: { children: React.ReactNode }) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [colors, setColors] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    // en guncel filters degerini saklamak icin
    const filtersRef = useRef(filters)

    useEffect(() => {
        filtersRef.current = filters;
    }, [filters])

    const fetchCategories = async () => {
        const data = await apiRequest<Category[]>("GET", "/category");
        setCategories(data);
    };

    const fetchSubCategories = async (catId: number) => {
        const data = await apiRequest<SubCategory[]>("GET", `/category/${catId}`);
        setSubCategories(data);
    };

    const [isFetching, setIsFetching] = useState(false)

    const fetchProducts = async (isNewFilter: boolean) => {
        try {
            const currentFilters = filtersRef.current; // en guncel filters degerleri

            const params = new URLSearchParams();
            console.log(params.toString())

            Object.keys(currentFilters).forEach((key) => {

                const value = currentFilters[key as keyof typeof currentFilters]
                console.log("value", value)

                if (value !== undefined && value !== null) {
                    if (Array.isArray(value) && value.length > 0) {
                        params.append(key, value.join(','))
                    } else if (!Array.isArray(value)) {
                        params.append(key, value.toString())
                    }
                }
            })


            const queryString = params.toString();
            const apiUrl = `/product?${queryString}`; // API URL’si

            const data = await apiRequest<Product[]>("GET", apiUrl);
            setProducts(isNewFilter ? data : (prev) => [...prev, ...data]);
            // yeni filtreyse direk datayi bas, sadece sayfa degismis filtre ayniysa datayi `ekle`
            console.log("queryString", queryString);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsFetching(false) // yukleme tamamlandi
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
        const isNewFilter = filters.pageNumber === 1; // pageNumber degeri degisirse false olacak
        const timeoutId = setTimeout(() => {
            fetchProducts(isNewFilter); // debounce suresi doldugunda istek atilir
        }, 500);

        return () => clearTimeout(timeoutId); // onceki setTimeoutu temizleyerek gereksiz istekleri engelle
    }, [filters]); //filtre degisimi ref'e yansidiktan sonra tetikle


    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            selectedColors: []
        }))
    }, [colors]) // colors listesi degisirse, secilen renkleri sifirla

    useEffect(() => {
        // Eğer filtreler değişmişse ve sadece sayfa numarası değişmemişse, sayfa numarasını sıfırla
        setFilters((prev) => ({
            ...prev,
            pageNumber: 1, // Yeni filtrede sayfa numarasını 1 yap
        }));
    }, [JSON.stringify({ ...filters, pageNumber: undefined })]); // Sayfa numarası hariç diğer filtreleri izle

    return (
        <ShopContext.Provider value={{
            filters, setFilters,
            colors, fetchColors,
            categories, fetchCategories,
            subCategories, fetchSubCategories,
            products,
            isFetching, setIsFetching
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export { ShopContext, ShopContextProvider }

