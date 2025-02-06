import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Item } from "../types/cart";




const Cart = () => {

    const { cartItems } = useContext(CartContext)
    console.log(cartItems)
    const { details, items } = cartItems;
    const shippingCost = (details.totalPrice * 0.10);
    const tax = ((details.totalPrice + shippingCost) * 0.20);
    const total = (details.totalPrice + shippingCost + tax);

    return (
        <div className="max-w-[90rem] mx-auto my-10 bg-darkblue text-cream p-10 rounded-2xl shadow-2xl">
            <h2 className="text-center font-bold border-b pb-10 mb-10">Shopping Cart</h2>

            <div className="flex flex-col gap-4">

                <div className="hidden md:grid md:grid-cols-5 border-b gap-3">
                    <h4 className="text-center border-r">Product Image</h4>
                    <h4 className="text-center border-r">Product Name</h4>
                    <h4 className="text-center border-r">Quantity</h4>
                    <h4 className="text-center border-r">Price</h4>
                    <h4 className="text-center ">Cost</h4>
                </div>

                {items.map((item: Item, index: any) => (
                    <div key={index} className="grid md:grid-cols-5 border-b gap-3 p-2">
                        <img className="object-cover place-self-center w-30 h-24" src={`data:image/png;base64,${item.largePhoto}`} alt={item.productName} />
                        <h4 className="flex justify-center items-center">{item.productName}</h4>
                        <p className="flex justify-center items-center">{item.quantity}</p>
                        <p className="flex justify-center items-center">$ {item.listPrice.toFixed(2)}</p>
                        <p className="flex justify-center items-center">$ {item.totalPrice.toFixed(2)}</p>
                    </div>
                ))}
                <h6 className="text-end font-bold">Shipping: $ {shippingCost.toFixed(2)}</h6>
                <h6 className="text-end font-bold">Tax: $ {tax.toFixed(2)}</h6>
                <h4 className="text-end font-extrabold">Total Cost: $ {total}</h4>
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