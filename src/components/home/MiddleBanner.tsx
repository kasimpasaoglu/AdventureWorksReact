import { ArrowsRightLeftIcon, CheckIcon, PhoneIcon, TruckIcon } from '@heroicons/react/24/solid'


type Props = {}

function MiddleBanner({ }: Props) {
  return (
    <div className='grid md:grid-cols-4 gap-1 md:gap-10 mt-10'>
      <div className='flex text-darkblue cursor-default items-center justify-evenly bg-skyblue rounded-lg p-4'>
        <CheckIcon height={50} />
        <h6>Quality Product</h6>
      </div>
      <div className='flex text-darkblue cursor-default items-center justify-evenly bg-skyblue rounded-lg p-4'>
        <TruckIcon height={50} />
        <h6>Free Shipping</h6>
      </div>
      <div className='flex text-darkblue cursor-default items-center justify-evenly bg-skyblue rounded-lg p-4'>
        <ArrowsRightLeftIcon height={50} />
        <h6>14-Day Return</h6>
      </div>
      <div className='flex text-darkblue cursor-default items-center justify-evenly bg-skyblue rounded-lg p-4'>
        <PhoneIcon height={50} />
        <h6>24/7 Support</h6>
      </div>
    </div>
  )
}

export default MiddleBanner