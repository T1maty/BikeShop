import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"
import {ProductTagForCard} from "./ProductTagForCard"
import {ProductImage} from "./ProductImage"
import {Product} from "./Product"
import {ProductCard} from "./ProductCard";

export interface UpdateProductCard {
    product: Product // checkStatus: string
    productCard: ProductCard
    productOptions: ProductOption[]
    productSpecifications: ProductSpecification[]
    productImages: ProductImage[]
    productTags: ProductTagForCard[]
}

// export default {}