import { useContext, useEffect, useState } from "react"
import Filter from "../components/shop/Filter"
import { ChevronDoubleRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ShopContext } from "../context/ShopContext"
import ProductCard from "../components/ProductCard"





export const Shop = () => {

    const { filters, products, setFilters, isFetching, setIsFetching } = useContext(ShopContext)

    const [openFilters, setOpenFilters] = useState<boolean>(true)
    const [searchString, setSearchString] = useState<string>()

    const refreshProductList = () => {
        setFilters((prev) => ({
            ...prev, searchString: searchString
        }))
    }

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

            <div className="relative flex justify-center w-full col-span-1 px-3 md:col-span-4 h-11">
                <div className="relative w-full max-w-md">
                    <input
                        className="w-full px-10 py-2 border-skyblue border rounded"
                        type="text"
                        name="searchString"
                        id="searchString"
                        placeholder="Search..."
                        onChange={(event) => setSearchString(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key == "Enter") {
                                refreshProductList()
                            }
                        }}
                    />
                    <MagnifyingGlassIcon
                        className="absolute h-5 text-gray-400 duration-200 transform -translate-y-1/2 cursor-pointer left-3 top-1/2 hover:scale-125"
                        onClick={refreshProductList}
                    />
                </div>
            </div>

            <aside className={`${openFilters ? 'translate-x-0' : '-translate-x-[320px]'} md:col-span-1 fixed md:static md:translate-x-0 top-20 duration-500 max-w-80 md:max-w-full z-10 `}>
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