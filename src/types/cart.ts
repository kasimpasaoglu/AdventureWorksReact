export interface Cart {
    details: Details
    items: Item[]
}

export interface Details {
    totalPrice: number
    itemCount: number
}

export interface Item {
    productId: number
    productName: string
    largePhoto: string
    quantity: number
    listPrice: number
    totalPrice: number
}

export interface ToUpdateItem {
    productId: number
    quantity: number
}
