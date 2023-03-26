import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"

export interface UpdateProductCard {
    options: ProductOption[]
    specifications: ProductSpecification[]
    tags: []
    productCard: {}
}