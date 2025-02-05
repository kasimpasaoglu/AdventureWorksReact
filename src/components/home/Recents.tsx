import { useEffect, useState } from 'react'
import { Product } from '../../types/product'
import ProductCard from '../ProductCard'
import { apiRequest } from '../../infrastructure/requests';



function Recents() {
    const [recents, setRecents] = useState<Product[]>([])

    useEffect(() => {
        apiRequest<Product[]>("GET", "/product/recent")
            .then(setRecents)
            .catch(console.error);
    }, []);
    return (
        <div className='grid md:grid-cols-4 gap-1 md:gap-10 mt-10'>
            <h3 className='text-center text-darkblue md:col-span-4 flex items-center justify-center'>
                <span className="flex-grow border-t border-darkblue mx-4"></span>
                Recent Products
                <span className="flex-grow border-t border-darkblue mx-4"></span>
            </h3>
            {
                recents.map((item) => (
                    <ProductCard key={item.productId} product={item} />
                ))
            }
        </div>
    )
}

export default Recents