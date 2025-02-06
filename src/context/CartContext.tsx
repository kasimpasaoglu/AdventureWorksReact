import React, { createContext, useState, useContext, useEffect } from 'react';
import { Cart, Details } from '../types/cart';
import { AuthContext } from './AuthContext';
import { getCartItems } from '../infrastructure/cartRequests';


interface CartContextType {
    cartItems: Cart;
}

const defaultCart: Cart = { details: {} as Details, items: [] };

const CartContext = createContext<CartContextType>({
    cartItems: {
        details: {} as Details,
        items: []
    },
});


function CartContextProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useContext(AuthContext)

    const [cartItems, setCartItems] = useState<Cart>(defaultCart);

    useEffect(() => {
        if (isAuthenticated) {
            getCartItems()
                .then(data => setCartItems(data ?? defaultCart))
                .catch(error => console.error('Error fetching cart items:', error));
        } else {
            setCartItems(defaultCart)
        }
        console.log(isAuthenticated)
    }, [isAuthenticated])



    return (
        <CartContext.Provider value={{ cartItems }}>
            {children}
        </CartContext.Provider>
    );
};
export { CartContext, CartContextProvider }