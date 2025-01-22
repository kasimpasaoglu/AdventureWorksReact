import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


type Props = {
    images: string[]
}

function MainCarousel({ images }: Props) {
    const descriptions = [
        {
            text: "Explore our range of high-performance bicycles for every adventure.",
            buttonText: "Shop Bicycles",
        },
        {
            text: "Find the best accessories to enhance your cycling experience.",
            buttonText: "Shop Accessories",
        },
        {
            text: "Durable and reliable spare parts for your bike's maintenance.",
            buttonText: "Shop Spare Parts",
        },
    ];

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
                images.map((src, index) => (
                    <div className="relative w-full h-full" key={index}>

                        <div className="absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center bg-black/20 text-white">
                            <h5 className="font-bold mb-4">
                                {descriptions[index].text}
                            </h5>
                            <button
                                className="font-bold px-6 py-2 border border-white rounded-md text-white hover:bg-white hover:text-black duration-300"
                                onClick={() => console.log(`Navigating to ${descriptions[index]?.buttonText} page`)}
                            >
                                {descriptions[index]?.buttonText}
                            </button>
                        </div>

                        <img
                            className="object-cover h-full w-full"
                            src={src}
                            alt={`Image: ${index}`}
                        />
                    </div>
                ))
            }
        </Carousel>

    )
}

export default MainCarousel