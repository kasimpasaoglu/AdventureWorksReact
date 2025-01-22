import React, { useState } from 'react'
import { Product } from '../types/product'
import { MagnifyingGlassCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

type Props = {
    product: Product
}

function ProductCard({ product }: Props) {

    const [isAnimating, setIsAnimating] = useState(false)

    let nameUrl = product.name.replace(/ /g, '-')
    let formattedName = product.name.split(',')[0].trim();


    const handleClick = () => {


        setIsAnimating(true)

        setTimeout(() => {
            setIsAnimating(false)
        }, 200);
    }

    return (
        <div className="p-2 shadow-2xl border-skyblue border bg-cream rounded-xl hover:shadow-md hover:shadow-darkblue duration-200">
            {product.largePhoto && (
                <img
                    src={`data:image/png;base64,${product.largePhoto}`} // Base64 formatındaki resmi kullanıyoruz
                    alt={formattedName}
                    className="object-cover w-full rounded-xl"
                />
            )}
            <div className="space-y-2 p-5">
                <h5

                    className="my-2 font-bold text-center">{formattedName}</h5>
                {product.color &&
                    <p>
                        Color: <span>{product.color}</span>
                        <span
                            style={{ backgroundColor: product.color }}
                            className="inline-block w-4 h-4 ml-2 rounded-full"
                        ></span>
                    </p>
                }
                <p><strong className="mr-2 text-xl">{product.standardCost?.toFixed(2)} $ </strong><span className="text-sm line-through">{product.listPrice} $</span></p>
                <div className="flex gap-2 justify-evenly">
                    <button

                        className={`bg-darkblue px-4 py-1 rounded-md hover:bg-lightred text-cream ${isAnimating ? 'animate-shake' : ''}`}
                        type="button">
                        <ShoppingCartIcon className="h-6 inline-block" /> <span>Add To Chart</span>
                    </button>
                    <Link
                        to={`/detail/${product.productId}/${nameUrl}`}
                        state={{ productId: product.productId }}
                        className='bg-darkblue px-4 py-1 rounded-md hover:bg-lightred text-cream'
                        type="button">
                        <MagnifyingGlassCircleIcon className="h-6 inline-block" /> <span>Details</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard