import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"

export interface UpdateProductCard {
    // product: {}
    productCard: {}
    checkStatus: string
    // descriptionShort: string
    // description: string
    options: ProductOption[]
    specifications: ProductSpecification[]
    tags: []
}