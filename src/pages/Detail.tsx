import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getSingleProductById } from '../infrastructure/requests'
import { ProductDetail } from '../types/product'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import NotFound from '../components/shop/NotFound'


function Detail() {

    const [item, setItem] = useState<ProductDetail | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const { id } = useParams<{ id: string }>()


    useEffect(() => {
        if (id) {
            getSingleProductById(id)
                .then((data) => {
                    setItem(data)
                    console.log(data)
                })
                .catch(() => setItem(null))
        }
    }, [id])


    const handleAddCart = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setIsAnimating(false)
        }, 200);
    }
    if (!item) return (<NotFound />)

    return (

        <div className='mx-auto max-w-[1700px] min-h-[calc(100vh-100)] flex flex-col justify-center'>

            <div className='grid my-10 md:grid-cols-2 bg-darkblue text-cream rounded-xl py-14 px-10 gap-4'>
                <h1 className='md:col-span-2 text-center'>{item.name}</h1>
                <img className='col-span-1 w-full h-full p-4 rounded-3xl' src={`data:image/png;base64,${item.largePhoto}`} alt={item.name} />

                <div className='col-span-1 flex flex-col items-start justify-evenly p-5 gap-3'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-lg font-bold'>Price: {item.standardCost} $</p>
                        <p className='line-through'>{item.listPrice} $</p>
                        <p>+ tax</p>
                    </div>
                    {item.class &&
                        <p>
                            Class: <span className='font-bold'>{item.class.trim() == "H" ? "High" : item.class.trim() == "M" ? "Medium" : "Low"}</span>
                        </p>
                    }
                    {item.color &&
                        <p>
                            Color: <span className='font-bold'>{item.color}</span>
                            <span
                                style={{ backgroundColor: item.color }}
                                className="inline-block w-4 h-4 ml-2 rounded-full"
                            ></span>
                        </p>
                    }
                    {item.size &&
                        <p>Size: <span className='font-bold'>{item.size == "S" ? "Small" : item.size == "M" ? "Medium" : "Large"}</span></p>
                    }
                    {item.style &&
                        <p>Style: <span className='font-bold'>{item.style.trim() == "U" ? "Unisex" : item.style.trim() == "M" ? "Men" : "Women"}</span></p>
                    }
                    <p>{item.description}</p>
                    <button

                        className={`bg-seablue px-4 py-1 rounded-md hover:bg-lightred text-cream ${isAnimating ? 'animate-shake' : ''}`}
                        type="button"
                        onClick={handleAddCart}>
                        <ShoppingCartIcon className="h-6 inline-block" /> <span>Add To Chart</span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Detail