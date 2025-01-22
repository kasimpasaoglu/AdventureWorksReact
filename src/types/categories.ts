export interface Category {
    productCategoryId: number
    name: string
}

export interface SubCategory {
    productSubcategoryId: number
    productCategoryId: number
    name: string
}