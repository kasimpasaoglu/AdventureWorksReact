import React, { createContext, useState, useContext, useEffect } from 'react';
import { Cart, Details, ToUpdateItem } from '../types/cart';
import { AuthContext } from './AuthContext';
import { addCartItem, getCartItems, removeCartItem } from '../infrastructure/cartRequests';
import { useNavigate } from 'react-router';


interface CartContextType {
    cartItems: Cart;
    handleAddToCart: (item: ToUpdateItem) => void;
    handleRemoveFromCart: (item: ToUpdateItem) => void;
}

const defaultCart: Cart = { details: {} as Details, items: [] };

const CartContext = createContext<CartContextType>({
    cartItems: {
        details: {} as Details,
        items: []
    },
    handleAddToCart: () => { },
    handleRemoveFromCart: () => { },
});


function CartContextProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<Cart>(defaultCart);


    const handleAddToCart = async (item: ToUpdateItem) => {
        if (isAuthenticated) {

            try {
                await addCartItem(item)
            } catch (error) {
                console.log(error);
            }
            const newCart = await getCartItems();
            setCartItems(newCart ?? defaultCart);
        } else {
            navigate('/login')
        }
    }

    const handleRemoveFromCart = async (item: ToUpdateItem) => {
        if (isAuthenticated) {
            try {
                await removeCartItem(item)
            } catch (error) {
                console.log(error);
            }
            const newCart = await getCartItems();
            setCartItems(newCart ?? defaultCart);
        } else {
            navigate('/login')
        }
    }




    useEffect(() => {
        if (isAuthenticated) {
            getCartItems()
                .then(data => setCartItems(data ?? defaultCart))
                .catch(error => console.error('Error fetching cart items:', error));
        } else {
            setCartItems(defaultCart)
        }
    }, [isAuthenticated])



    return (
        <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
export { CartContext, CartContextProvider }