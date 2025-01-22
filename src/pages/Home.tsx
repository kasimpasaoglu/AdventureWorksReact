import image1 from '../../public/carousel/1.jpg'
import image2 from '../../public/carousel/2.jpg'
import image3 from '../../public/carousel/3.jpg'
import MainCarousel from '../components/home/MainCarousel'
import offer1 from '../../public/specialOffer/1.jpeg'
import offer2 from '../../public/specialOffer/2.jpeg'
import OfferCard from '../components/home/OfferCard'
import MiddleBanner from '../components/home/MiddleBanner'

const carouselImages = [image1, image2, image3]
const offerImages = [offer1, offer2]

type Props = {}

const Home = (props: Props) => {
    return (
        <div className="max-w-[1700px] mx-auto min-h-[calc(100vh-100px)] my-10">
            <div className="grid md:grid-cols-6 md:grid-rows-2 gap-10">
                <div className="md:col-span-4 row-span-2 h-full">
                    <MainCarousel images={carouselImages} />
                </div>
                <OfferCard offerImages={offerImages} />
            </div>
            <MiddleBanner />
        </div>
    )
}

export default Home