import image1 from '/carousel/1.jpg'
import image2 from '/carousel/2.jpg'
import image3 from '/carousel/3.jpg'
import MainCarousel from '../components/home/MainCarousel'
import offer1 from '/specialOffer/1.jpeg'
import offer2 from '/specialOffer/2.jpeg'
import OfferCard from '../components/home/OfferCard'
import MiddleBanner from '../components/home/MiddleBanner'
import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import CategoriesCard from '../components/home/CategoriesCard'
import Recents from '../components/home/Recents'
import GoTopButton from '../components/GoTopButton'
import { apiRequest } from '../infrastructure/requests'

const carouselImages = [image1, image2, image3]
const offerImages = [offer1, offer2]

const Home = () => {

    const [recents, setRecents] = useState<Product[]>([])

    useEffect(() => {
        apiRequest<Product[]>("GET", "/product/recent")
            .then(setRecents) // API'den gelen sonucu doğrudan `setRecents` ile güncelle
            .catch(console.error); // Hata durumunda `console.error` ile logla
    }, []);

    return (
        <div className="max-w-[1700px] mx-auto min-h-[calc(100vh-100px)] my-10">
            <GoTopButton />
            <div className="grid md:grid-cols-6 md:grid-rows-2 gap-10">
                <div className="md:col-span-4 row-span-2 h-full">
                    <MainCarousel images={carouselImages} />
                </div>
                <OfferCard offerImages={offerImages} />
            </div>
            <MiddleBanner />
            <CategoriesCard />
            <Recents recents={recents} />
        </div>
    )
}

export default Home