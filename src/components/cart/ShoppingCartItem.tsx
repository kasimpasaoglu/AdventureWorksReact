
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Item } from '../../types/cart'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

type Props = {
    item: Item
}

function ShoppingCartItem({ item }: Props) {
    const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext)

    return (
        <form key={item.productId} className="grid md:grid-cols-5 border-b gap-3 p-2 text-center">
            <img className="object-cover place-self-center w-30 h-24" src={`data:image/png;base64,${item.largePhoto}`} alt={item.productName} />
            <h5 className="flex justify-center items-center">{item.productName}</h5>
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={() => handleRemoveFromCart({ productId: item.productId, quantity: 1 })}
                    className='bg-seablue rounded-full hover:scale-125 duration-300 p-1' type="button"><MinusIcon width={20} height={20} /></button>
                <p className="text-darkblue w-10 p-2 bg-cream text-center rounded-full font-extrabold cursor-default">{item.quantity}</p>
                <button
                    onClick={() => handleAddToCart({ productId: item.productId, quantity: 1 })}
                    className='bg-seablue rounded-full hover:scale-125 duration-300 p-1' type="button"><PlusIcon width={20} height={20} /> </button>
            </div>
            <p className="flex justify-center items-center">$ {item.listPrice.toFixed(2)}</p>
            <p className="flex justify-center items-center font-bold">$ {item.totalPrice.toFixed(2)}</p>
        </form>
    )
}

export default ShoppingCartItem