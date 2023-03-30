import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"

export interface UpdateProductCard {
    // product: {}
    checkStatus: string
    productCard: {}
    options: ProductOption[]
    specifications: ProductSpecification[]
    productImages: []
    productTags: []
}