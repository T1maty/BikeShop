import {Product, ProductOptionVariantBind, ProductSpecificationBind} from "../../../../entities"

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productTags: string[]
    bindedProducts: Product[]
}