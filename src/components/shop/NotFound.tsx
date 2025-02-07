import { BiError } from 'react-icons/bi'
import { FaShop } from 'react-icons/fa6'
import { Link } from 'react-router-dom'



function NotFound() {
    return (
        <div className='flex items-center'>
            <div
                className='mx-auto bg-darkblue flex flex-col p-10 md:p-28 justify-evenly items-center gap-10 text-cream text-center rounded-2xl shadow-2xl'>
                <h2 className='flex gap-5'>404 Error <BiError /></h2>
                <h1>Item Cannot Found</h1>
                <Link to='/shop' className='bg-lightred text-3xl px-10 py-5 rounded-full flex gap-5 hover:bg-green-800 duration-200'>Return Shop
                    <FaShop />
                </Link>
            </div>
        </div>
    )
}

export default NotFound