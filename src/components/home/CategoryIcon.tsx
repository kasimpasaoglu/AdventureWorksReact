import { BiSolidComponent } from "react-icons/bi";
import { FaHelmetSafety } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { IoIosBicycle } from "react-icons/io";


export const CategoryIcon = ({ id, className }: { id: number, className: string }) => {
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