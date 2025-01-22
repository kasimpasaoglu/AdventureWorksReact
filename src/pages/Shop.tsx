import Filter from "../components/shop/Filter"
import { Filters } from "../types/product"


type Props = {}

const Shop = (props: Props) => {
    const testFilter: Filters = {
        productCategoryId: 0
    }
    return (
        <Filter filter={testFilter} />
    )
}

export default Shop