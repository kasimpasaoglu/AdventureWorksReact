export interface RegisterUser {
    title: string
    firstName: string
    lastName: string
    emailAddress1: string
    password: string
    addressTypeId: number
    addressLine1: string
    addressLine2: string
    city: string
    postalCode: string
}

export interface User {
    title?: string
    firstName?: string
    lastName?: string
    emailAddress1?: string
    password: string
    addressTypeId?: number
    addressLine1?: string
    addressLine2?: string
    city?: string
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