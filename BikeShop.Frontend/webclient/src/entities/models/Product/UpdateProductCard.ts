import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "./ProductSpecification"

export interface UpdateProductCard {
    // product: {}
    checkStatus: string
    productCard: {}
    // descriptionShort: string
    // description: string
    options: ProductOption[]
    specifications: ProductSpecification[]
    productImages: []
    productTags: []
}