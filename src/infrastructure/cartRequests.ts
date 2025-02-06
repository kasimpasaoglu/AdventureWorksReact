import { Cart, ToUpdateItem } from "../types/cart";

const BASE_URL = "http://adventureworksapi.runasp.net/api/Cart"

export const getCartItems = async (): Promise<Cart | null> => {

    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            return await response.json();
        }

        return null;

    } catch (error) {
        console.log("Error fetching cart items:", error);
        return null
    }
}

export const addCartItem = async (item: ToUpdateItem) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error("Failed to add item to cart")
        }
    } catch (error) {
        throw error;
    }
}
