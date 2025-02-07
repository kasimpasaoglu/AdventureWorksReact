import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router';
import logo from '/react.svg'
import { Bars3Icon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Badge } from '@mui/material';
import { useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';



function Header() {
    const { cartItems } = useContext(CartContext)
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleAccountClick = () => {
        if (isAuthenticated) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            navigate('/login');
        }
    }
    return (
        <>
            <nav className="sticky top-0 z-50 shadow-md md:rounded-b-3xl text-cream bg-darkblue shadow-darkblue">
                <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex flex-row gap-4 items-center animate-pulse">
                            <img className='h-6' src={logo} alt="logo" />
                            <h1 className="text-lg md:text-2xl font-bold">Adventure Works Store</h1>
                        </div>

                        {/* Desktop */}
                        <div className="items-center justify-between hidden gap-4 md:flex">

                            <Link to="/"
                                className={`${pathname === '/' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-5 py-1 duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                Home
                            </Link>

                            <Link to="/shop"
                                className={`${pathname === '/shop' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-5 py-1 duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                Shop
                            </Link>

                            <Link to="/about"
                                className={`${pathname === '/about' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-5 py-1 duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                About
                            </Link>

                            <button
                                onClick={handleCartClick}
                                className={`${pathname === '/cart' ? "bg-black" : "bg-lightred "} text-cream px-2 py-1 duration-300 rounded-lg hover:bg-red-900`}
                                type="button"
                            >
                                <Badge badgeContent={cartItems.details.itemCount} color='primary'>
                                    <ShoppingCartIcon className="h-6" />
                                </Badge>
                            </button>

                            <button onClick={handleAccountClick}
                                className={`${pathname === '/account' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-2 py-1 duration-300 rounded-lg  hover:bg-gray-600 hover:text-cream`}
                                type="button"
                            >
                                <Badge>
                                    <UserIcon className="h-6" />
                                </Badge>
                            </button>

                        </div>

                        {/* Mobil */}
                        <div className="md:hidden flex justify-center items-center gap-3">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <button
                                            onClick={handleCartClick}
                                            className={`${pathname === '/cart' ? "bg-black" : "bg-lightred "} text-cream px-2 py-1 duration-300 rounded-lg hover:bg-red-900`}
                                            type="button"
                                        >
                                            <Badge badgeContent={cartItems.details.itemCount} color='primary'>
                                                <ShoppingCartIcon className="h-6" />
                                            </Badge>
                                        </button>

                                        <button
                                            className={`${pathname === '/account' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-2 py-1 duration-300 rounded-lg  hover:bg-gray-600 hover:text-cream`}
                                            type="button"
                                        >
                                            <Badge>
                                                <UserIcon className="h-6" />
                                            </Badge>
                                        </button>
                                        <DisclosureButton className="text-white focus:outline-none">
                                            <span className="sr-only">Open Menu</span>
                                            {open ?
                                                (<XMarkIcon className='transition duration-500 size-8 fill-white shadow-white' />)
                                                :
                                                (<Bars3Icon className='transition duration-500 size-8 fill-white shadow-white' />)
                                            }
                                        </DisclosureButton>


                                        <Transition
                                            show={open}
                                            enter="transition duration-300 ease-out"
                                            enterFrom="transform opacity-0 -translate-y-10"
                                            enterTo="transform opacity-100 translate-y-0"
                                            leave="transition duration-200 ease-in"
                                            leaveFrom="transform opacity-100 translate-y-0"
                                            leaveTo="transform opacity-0 -translate-y-10"
                                        >
                                            <DisclosurePanel
                                                static
                                                className="absolute z-10 border rounded-lg w-36 bg-seablue border-cream top-16"
                                            >
                                                <div className="flex flex-col gap-1 py-3 px-2">
                                                    <Link to="/"
                                                        className={`${pathname === '/' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-4 py-1 text-center duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                                        Home
                                                    </Link>

                                                    <Link to="/shop"
                                                        className={`${pathname === '/shop' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-4 py-1 text-center duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                                        Shop
                                                    </Link>

                                                    <Link to="/about"
                                                        className={`${pathname === '/about' ? "text-cream bg-black" : "text-darkblue bg-skyblue"} px-4 py-1 text-center duration-300 rounded-xl hover:text-cream hover:bg-gray-600`}>
                                                        About
                                                    </Link>
                                                </div>
                                            </DisclosurePanel>
                                        </Transition>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
