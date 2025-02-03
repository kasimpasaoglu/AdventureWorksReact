import { IoIosBicycle } from "react-icons/io";
import { BiSolidComponent } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { FaHelmetSafety } from "react-icons/fa6";
import { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from "react-router";


const CategoryIcon = ({ id, className }: { id: number, className: string }) => {
    switch (id) {
        case 1:
            return <IoIosBicycle className={`h-11 w-11 ${className}`} />
        case 2:
            return <BiSolidComponent className={`h-11 w-11 ${className}`} />
        case 3:
            return <GiClothes className={`h-11 w-11 ${className}`} />
        case 4:
            return <FaHelmetSafety className={`h-11 w-11 ${className}`} />
        default:
            return <div className="h-8 w-8 bg-gray-500 rounded-full" />
    }
};

function CategoriesCard() {
    const { categories, setFilters, fetchCategories } = useContext(ShopContext)

    const navigate = useNavigate()

    const handleCategoryClick = (categoryId: number) => {
        setFilters((prev) => ({
            ...prev,
            productCategoryId: categoryId,
            productSubcategoryId: undefined
        }))
        navigate("/shop")
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className='grid md:grid-cols-4 gap-1 md:gap-10 mt-10'>
            <h3 className='text-center text-darkblue md:col-span-4 flex items-center justify-center'>
                <span className="flex-grow border-t border-darkblue mx-4"></span>
                Categories
                <span className="flex-grow border-t border-darkblue mx-4"></span>
            </h3>
            {
                categories.map((category) => (
                    <button
                        key={category.productCategoryId}
                        className='group duration-500 hover:bg-darkblue flex text-cream items-center justify-evenly bg-seablue rounded-lg p-4'
                        onClick={() => handleCategoryClick(category.productCategoryId)}
                    >
                        <CategoryIcon className='duration-500 group-hover:scale-125 group-hover:rotate-3' id={category.productCategoryId} />
                        <h6 className='duration-500 group-hover:scale-125 group-hover:-rotate-3'>{category.name}</h6>
                    </button>
                ))
            }
        </div>
    )
}

export default CategoriesCard