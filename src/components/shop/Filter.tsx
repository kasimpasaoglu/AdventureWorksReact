import { useContext, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'


function Filter() {

    const { filters, colors, setFilters, fetchColors, categories, subCategories, fetchCategories, fetchSubCategories } = useContext(ShopContext);

    const onCategorySelect = (catId: number) => {
        setFilters((prev) => ({
            ...prev, productCategoryId: catId, productSubcategoryId: undefined
        }))
        fetchSubCategories(catId)
        fetchColors(catId)
    }

    const onSubCategorySelect = (subId: number) => {
        setFilters((prev) => ({
            ...prev, productSubcategoryId: subId
        }))
        fetchColors(filters.productCategoryId, subId)
    }

    const onMinPriceChange = (minPrice: number) => {
        setFilters((prev) => ({
            ...prev,
            minPrice: isNaN(minPrice) ? undefined : minPrice, // bos birakilirsa undefined olacak
        }));
    };
    const onMaxPriceChange = (maxPrice: number) => {
        setFilters((prev) => ({
            ...prev,
            maxPrice: isNaN(maxPrice) ? undefined : maxPrice, // bos birakilirsa undefined olacak
        }));
    };

    const onColorChange = (color: string) => {
        setFilters((prev) => {
            const selectedColors = prev.selectedColors ?? []; // undefined ise bos dizi ata
            const isSelected = selectedColors.includes(color);

            return {
                ...prev,
                selectedColors: isSelected
                    ? selectedColors.filter((c) => c !== color) // regni kaldir
                    : [...selectedColors, color], // rengi ekle
            };
        });
    };

    useEffect(() => {
        fetchCategories();
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
                            checked={filters?.productCategoryId === category.productCategoryId}
                            onChange={() => onCategorySelect(category.productCategoryId)}
                        />
                        <span className="px-3 text-center rounded">{category.name}</span>
                    </label>
                ))}
            </div>

            {/* Sub-Categories Section */}
            {subCategories.length > 0 ?
                <div className="flex flex-col gap-1">
                    <h4>Sub-Categories</h4>
                    {subCategories.map((subCategory) => (
                        <label
                            key={subCategory.productSubcategoryId}
                            className="flex items-center px-3 space-x-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="subCategories"
                                value={subCategory.productSubcategoryId}
                                checked={filters?.productSubcategoryId === subCategory.productSubcategoryId}
                                onChange={() => onSubCategorySelect(subCategory.productSubcategoryId)}
                            />
                            <span className="px-3 text-center rounded">{subCategory.name}</span>
                        </label>
                    ))}
                </div>
                : null}

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
                        onChange={(e) => onMinPriceChange(Number(e.target.value))}
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
                        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                    />

                </div>
            </div>


            {/* Colors Filter Section */}
            {colors.length > 0 ?
                <div className="flex flex-col gap-1">
                    <h4>Select Colors</h4>
                    {colors.map((color, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={color}
                                checked={filters.selectedColors?.includes(color)} // Seçili olup olmadığını kontrol et
                                onChange={() => onColorChange(color)} // Değişiklikleri işle
                                className="cursor-pointer"
                            />
                            <span className="px-2">{color}</span>
                        </label>
                    ))}
                </div>
                : null
            }
        </div>
    )
}

export default Filter