import React from 'react'

type Props = {
    offerImages: string[]
}

function OfferCard({ offerImages }: Props) {
    return (
        <>
            {
                offerImages.map((src, index) => (
                    <div key={index} className='group md:col-span-2 overflow-hidden relative cursor-pointer'>
                        <img className='w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:rotate-6 group-hover:scale-125 duration-500 ' src={src} alt="Offer Image" />
                        <div className='w-full h-full absolute top-0 right-0 flex justify-center items-center'>
                            <h5 className='text-white font-extrabold group-hover:bg-gradient-to-r group-hover:from-red-300 group-hover:via-yellow-300 group-hover:to-green-300 group-hover:bg-clip-text group-hover:text-transparent duration-300'>{index === 0 ? 'Add Color To Your Life' : "Don't Miss Special Offers"}</h5>
                        </div>
                    </div>
                ))
            }
        </>

    )
}

export default OfferCard