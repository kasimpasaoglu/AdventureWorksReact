import MainCarousel from '../components/home/MainCarousel'
import OfferCard from '../components/home/OfferCard'
import MiddleBanner from '../components/home/MiddleBanner'
import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import CategoriesCard from '../components/home/CategoriesCard'
import Recents from '../components/home/Recents'

import { apiRequest } from '../infrastructure/requests'



const Home = () => {

    const [recents, setRecents] = useState<Product[]>([])

    useEffect(() => {
        apiRequest<Product[]>("GET", "/product/recent")
            .then(setRecents)
            .catch(console.error);
    }, []);

    return (
        <div className="max-w-[1700px] mx-auto min-h-[calc(100vh-100px)] my-10">
            <div className="grid md:grid-cols-6 md:grid-rows-2 gap-10">
                <div className="md:col-span-4 row-span-2 h-full">
                    <MainCarousel />
                </div>
                <OfferCard />
            </div>
            <MiddleBanner />
            <CategoriesCard />
            <Recents recents={recents} />
        </div>
    )
}

export default Home