export interface RegisterUser {
    title: string
    firstName: string
    middleName?: string
    lastName: string
    emailAddress1: string
    password: string
    emailPromotion: number
    addressTypeId: number
    addressLine1: string
    addressLine2: string
    city: string
    stateProvinceId: number
    postalCode: string
}

export interface User {
    title?: string
    firstName?: string
    middleName?: string
    lastName?: string
    emailAddress1?: string
    password?: string
    emailPromotion?: number
    addressTypeId?: number
    addressLine1?: string
    addressLine2?: string
    city?: string
    stateProvinceId?: number
    postalCode?: string
}

export interface LoginPostBody {
    email: string
    password: string
}


export interface AddressConstants {
    states?: State[]
    addressTypes?: AddressType[]
}

export interface State {
    stateProvinceId: number
    name: string
}

export interface AddressType {
    addressTypeId: number
    name: string
}