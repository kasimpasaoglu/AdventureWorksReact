import { useEffect, useState } from 'react'
import { Filters } from '../../types/product'
import { Category, SubCategory } from '../../types/categories'
import { loadCategories, loadSubCategories } from '../../infrastructure/requests'

type Props = {
    filter: Filters
}

function Filter({ }: Props) {
    const [filter, setFilter] = useState<Filters>()
    const [categories, setCategories] = useState<Category[]>([])
    const [subCategories, setSubCategories] = useState<SubCategory[]>([])

    const fetchCategories = async () => {
        try {
            const data = await loadCategories()
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSubCategories = async (catId: number) => {
        try {
            const data = await loadSubCategories(catId)
            setSubCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    const onCategorySelect = (catId: number) => {
        setFilter((prev) => ({
            ...prev, productCategoryId: catId
        }))
        fetchSubCategories(catId)
        console.log(filter)
    }
    const onSubCategorySelect = (subId: number) => {
        setFilter((prev) => ({
            ...prev, productSubcategoryId: subId
        }))
        console.log(filter)
    }


    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="flex flex-col px-3 py-6 overflow-y-auto shadow-xl max-h-[90vh] md:max-h-full md:overflow-y-hidden bg-cream rounded-xl border-skyblue border">
            {/* Categories Section */}
            <div className="flex flex-col gap-1">
                <h4>Categories</h4>
                {categories.map((category) => (
                    <label
                        key={category.productCategoryId}
                        className="flex items-center px-3 space-x-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="categories"
                            value={category.productCategoryId}
                            checked={filter?.productCategoryId === category.productCategoryId}
                            onChange={() => onCategorySelect(category.productCategoryId)}
                        />
                        <span className="px-3 text-center rounded">{category.name}</span>
                    </label>
                ))}
            </div>

            {/* Sub-Categories Section */}
            <div className="flex flex-col gap-1">
                <h4>Sub-Categories</h4>
                {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                        <label
                            key={subCategory.productSubcategoryId}
                            className="flex items-center px-3 space-x-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="subCategories"
                                value={subCategory.productSubcategoryId}
                                checked={filter?.productSubcategoryId === subCategory.productSubcategoryId}
                                onChange={() => onSubCategorySelect(subCategory.productSubcategoryId)}
                            />
                            <span className="px-3 text-center rounded">{subCategory.name}</span>
                        </label>
                    ))
                ) : (
                    <p className="mb-4">Select Category First</p>
                )}
            </div>

            {/* Price Filter Section */}
            <div className="flex flex-col gap-3">
                <h4>Price</h4>
                {/* Min Price */}
                <div className="flex items-center gap-2 relative">
                    <label className="w-36" htmlFor="minPrice">Min Price:</label>
                    <input
                        className="flex-shrink px-1 no-spinner border-skyblue border"
                        type="number"
                        id="minPrice"
                        step="any"
                        min="0"
                        placeholder="Min Price$"
                    // onChange={(e) => onMinPriceChange(Number(e.target.value))}
                    />

                </div>

                {/* Max Price */}
                <div className="flex items-center gap-2 relative">
                    <label className="w-36" htmlFor="maxPrice">Max Price:</label>
                    <input
                        className="flex-shrink px-1 no-spinner border-skyblue border"
                        type="number"
                        id="maxPrice"
                        step="any"
                        min="0"
                        placeholder="Max Price $"
                    // onChange={(e) =>
                    //     onMaxPriceChange(e.target.value === "" ? null : Number(e.target.value))
                    // }
                    />

                </div>
            </div>


            {/* Colors Filter Section */}
            {/* {colors ?
                <div className="flex flex-col gap-1">
                    <h4>Select Colors</h4>
                    {colors.map((color, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={color}
                                onChange={() => onColorChange(color)}
                                className="cursor-pointer"
                            />
                            <span className="px-2">{color}</span>
                        </label>
                    ))}
                </div>
                : null
            } */}

            {/* Apply Button */}
            {/* <button
                onClick={onApply}
                className="self-center py-3 my-5 bg-darkblue text-cream px-11 rounded-2xl"
                type="button"
            >
                Apply
            </button> */}
        </div>
    )
}

export default Filter