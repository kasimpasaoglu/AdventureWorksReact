import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'

type Props = {}

function SearchBar({ }: Props) {
    const { setFilters } = useContext(ShopContext)
    const [searchString, setSearchString] = useState<string>()

    const refreshProductList = () => {
        setFilters((prev) => ({
            ...prev, searchString: searchString
        }))
    }

    return (
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
    )
}

export default SearchBar