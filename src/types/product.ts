export interface Filters {
    productCategoryId?: number
    productSubcategoryId?: number
    minPrice?: number
    maxPrice?: number
    selectedColors?: string[]
    sortBy?: string
    searchString?: string
    pageSize?: number
    pageNumber?: number
}

export interface Product {
    productId: number;
    name: string;
    listPrice: number;
    standardCost?: number;
    color?: string;
    largePhoto?: string;
}

export interface ProductDetail {
    productId: number
    name: string
    listPrice: number
    standardCost: number
    color?: string
    class?: string
    style?: string
    size?: string
    productCategoryId: number
    productSubcategoryId: number
    description?: string
    largePhoto?: string
}