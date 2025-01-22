import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { Link } from 'react-router';
import logo from '../assets/react.svg'
import { BuildingStorefrontIcon, ChevronDownIcon, HomeIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { RootState } from '../store/store';



function Header() {

    const count = useSelector((state: RootState) => state.cartCounter.value)

    return (
        <>
            <nav className="sticky top-0 z-50 shadow-md rounded-b-3xl text-cream bg-darkblue shadow-darkblue">
                <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex flex-row flex-shrink-0 gap-4 animate-pulse">
                            <img src={logo} alt="logo" />
                            <h1 className="text-2xl font-bold">Adventure Works Store</h1>
                        </div>

                        {/* Masaüstü Menüsü */}
                        <div className="items-center justify-between hidden gap-4 md:flex">
                            <Link to="/" className="px-5 py-1 duration-300 bg-skyblue rounded-xl text-darkblue hover:text-cream hover:bg-black">Home</Link>
                            <Link to="/shop" className="px-5 py-1 duration-300 bg-skyblue rounded-xl text-darkblue hover:text-cream hover:bg-black">Shop</Link>
                            <button className="px-2 py-1 text-white duration-300 rounded-lg bg-lightred hover:bg-red-900" type="button">
                                <Badge badgeContent={count} color='primary'>
                                    <ShoppingCartIcon className="h-6" />
                                </Badge>
                            </button>
                        </div>

                        {/* Mobil Menüsü */}
                        <div className="md:hidden">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="text-white focus:outline-none">
                                            <span className="sr-only">Open Menu</span>

                                            <ChevronDownIcon className={`${open ? "-rotate-180" : ""} transition duration-500 size-8 fill-white drop-shadow-xl shadow-white`} />


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
                                                className="absolute z-10 border rounded-lg w-36 bg-seablue border-cream top-11 right-5"
                                            >
                                                <div className="flex flex-col gap-1 py-3">
                                                    <Link to="/" className="px-4 py-1 space-x-2">
                                                        <HomeIcon className='inline-block h-6' /><span>Home</span>
                                                    </Link>
                                                    <Link to="/shop" className="px-4 py-1 space-x-2">
                                                        <BuildingStorefrontIcon className='inline-block h-6' /><span>Shop</span>
                                                    </Link>
                                                    <UserCircleIcon className='h-6' />
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
