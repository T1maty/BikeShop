import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"
import {ProductTagForCard} from "./ProductTagForCard"
import {ProductImage} from "./ProductImage"
import {Product} from "./Product"

export interface UpdateProductCard {
    product: Product // checkStatus: string
    productCard: {}
    productOptions: ProductOption[]
    productSpecifications: ProductSpecification[]
    productImages: ProductImage[]
    productTags: ProductTagForCard[]
}

// export default {}