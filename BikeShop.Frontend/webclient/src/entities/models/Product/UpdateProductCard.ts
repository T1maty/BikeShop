import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"
import {ProductTagForCard} from "./ProductTagForCard"
import {ProductImage} from "./ProductImage"
import {ProductCard} from "./ProductCard";

export interface UpdateProductCard {
    id: number
    checkStatus: string
    productCard: ProductCard
    productOptions: ProductOption[]
    productSpecifications: ProductSpecification[]
    productImages: ProductImage[]
    productTags: ProductTagForCard[]
}

// export default {}