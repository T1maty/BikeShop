import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"

export interface UpdateProductCard {
    product: {}
    productCard: {}
    options: ProductOption[]
    specifications: ProductSpecification[]
    tags: []
}