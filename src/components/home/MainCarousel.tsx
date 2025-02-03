import { useNavigate } from 'react-router';
import image1 from '/carousel/1.jpg'
import image2 from '/carousel/2.jpg'
import image3 from '/carousel/3.jpg'
import image4 from '/carousel/4.jpg'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

type CarouselItem = {
    id: number,
    src: string,
    text: string,
    buttonText: string
}

const carouselCards: CarouselItem[] = [
    {
        id: 1,
        src: image1,
        text: "Explore our range of high-performance bicycles for every adventure.",
        buttonText: "Shop Bicycles",
    },
    {
        id: 2,
        src: image2,
        text: "Durable and reliable spare parts for your bike's maintenance.",
        buttonText: "Shop Spare Parts",
    },
    {
        id: 3,
        src: image3,
        text: "Ride in comfort and style with our premium cycling apparel.",
        buttonText: "Shop Cycling Apparel",
    },
    {
        id: 4,
        src: image4,
        text: "Find the best accessories to enhance your cycling experience.",
        buttonText: "Shop Accessories",
    }
]

function MainCarousel() {

    const { setFilters } = useContext(ShopContext)
    const navigate = useNavigate()

    const handleClick = (categoryId: number) => {
        setFilters((prev) => ({
            ...prev,
            productCategoryId: categoryId,
            productSubcategoryId: undefined
        }))
        navigate("/shop")
    }

    return (


        <Carousel
            autoPlay={true}
            emulateTouch={true}
            infiniteLoop={true}
            interval={3000}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            stopOnHover={true}
            className="h-full"
        >
            {
                carouselCards.map((item) => (
                    <div className="relative w-full h-full" key={item.id}>

                        <div className="absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center bg-black/50 text-white">
                            <h5 className="font-bold mb-4">
                                {item.text}
                            </h5>
                            <button
                                className="font-bold px-6 py-2 border border-white rounded-md text-white hover:bg-white hover:text-black duration-300"
                                onClick={() => handleClick(item.id)}
                            >
                                {item.buttonText}
                            </button>
                        </div>

                        <img
                            className="object-cover h-full w-full"
                            src={item.src}
                            alt={`Image: ${item.id}`}
                        />
                    </div>
                ))
            }
        </Carousel>

    )
}

export default MainCarousel