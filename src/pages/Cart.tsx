import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Item } from "../types/cart";
import ShoppingCartItem from "../components/cart/ShoppingCartItem";




const Cart = () => {

    const { cartItems } = useContext(CartContext)
    const { details, items } = cartItems;


    const shippingCost = (details.totalPrice * 0.10);
    const tax = ((details.totalPrice + shippingCost) * 0.20);
    const total = (details.totalPrice + shippingCost + tax);

    if (items.length === 0) {
        return (
            <div className="max-w-[90rem] mx-auto my-10 bg-darkblue text-cream p-10 rounded-2xl shadow-2xl">
                <h3 className="text-center font-bold border-b pb-10 mb-10">Shopping Cart</h3>
                <p className="text-center">Your cart is empty.</p>
            </div>
        )
    }

    return (
        <div className="max-w-[90rem] mx-auto my-10 bg-darkblue text-cream p-10 rounded-2xl shadow-2xl">
            <h3 className="text-center font-bold border-b pb-10 mb-10">Shopping Cart</h3>

            <div className="flex flex-col gap-4">

                <div className="hidden md:grid md:grid-cols-5 border-b gap-3">
                    <h5 className="text-center border-r">Product Image</h5>
                    <h5 className="text-center border-r">Product Name</h5>
                    <h5 className="text-center border-r">Quantity</h5>
                    <h5 className="text-center border-r">Price</h5>
                    <h5 className="text-center ">Cost</h5>
                </div>

                {items.map((item: Item) => (
                    <ShoppingCartItem key={item.productId} item={item} />
                ))}
                <h6 className="text-end font-bold">Shipping: $ {shippingCost.toFixed(2)}</h6>
                <h6 className="text-end font-bold">Tax: $ {tax.toFixed(2)}</h6>
                <h5 className="text-end font-extrabold">Total Cost: $ {total.toFixed(2)}</h5>
                <button className="bg-seablue text-cream px-20 py-2 mt-4 font-extrabold mx-auto">Checkout</button>

            </div>

        </div>
    )
}

export default Cart

//  export interface Item {
//     productName: string
//     largePhoto: string
//     quantity: number
//     listPrice: number
//     totalPrice: number
// }