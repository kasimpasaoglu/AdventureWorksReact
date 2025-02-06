import { useContext, useEffect, useState } from "react"
import Filter from "../components/shop/Filter"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid"
import { ShopContext } from "../context/ShopContext"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/shop/SearchBar"
import { useClickOutside } from "@mantine/hooks"





export const Shop = () => {

    const { filters, products, setFilters, isFetching, setIsFetching } = useContext(ShopContext)

    const [openFilters, setOpenFilters] = useState<boolean>(false)
    const ref = useClickOutside(() => setOpenFilters(false))




    const handleFilters = () => (
        openFilters ? setOpenFilters(false) : setOpenFilters(true)
    )
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpenFilters(true); // `md` boyutunda ve üstü için açık
            } else {
                setOpenFilters(false); // Mobil için kapalı
            }
        };

        // İlk render sırasında kontrol
        handleResize();

        // Pencere boyutunu dinleme
        window.addEventListener("resize", handleResize);

        // Temizlik fonksiyonu
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching) {
                setIsFetching(true); // yukleme basladi
                setFilters((prev) => ({
                    ...prev,
                    pageNumber: (prev.pageNumber ?? 1) + 1,
                }));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFetching, filters.pageNumber]); // Sadece `isFetching` ve `pagenubmer` değiştiğinde çalışsın


    return (
        <section className="grid grid-cols-1 md:grid-cols-4 mx-auto max-w-[1500px] my-5 gap-3">

            <SearchBar />

            <aside ref={ref} className={`${openFilters ? 'translate-x-0' : '-translate-x-[320px]'} md:col-span-1 fixed md:static md:translate-x-0 top-20 duration-500 max-w-80 md:max-w-full z-10 `}>
                <button
                    className="absolute rounded-r-full bg-cream top-1/3 -right-10 md:hidden border-skyblue border-r border-t border-b"
                    type="button"
                    onClick={() => handleFilters()}>
                    <ChevronDoubleRightIcon className={`${openFilters ? 'rotate-180' : ''} h-10 duration-500`} />
                </button>
                <Filter />
            </aside>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 col-span-1 md:col-span-3  gap-3">
                {products.length > 0 ? (
                    products?.map((product) => (
                        <ProductCard product={product} key={product.productId} />
                    ))
                ) : (
                    <p className="text-center text-darkblue font-bold col-span-full">
                        No products found. Please adjust your filters.
                    </p>
                )}
            </div>

        </section>
    )
}