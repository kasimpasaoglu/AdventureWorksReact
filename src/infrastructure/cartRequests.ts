import { Cart } from "../types/cart";

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
