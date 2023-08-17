import {Product, ProductOptionVariantBind, ProductSpecificationBind} from "entities"

export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productTags: []
    bindedProducts: Product[]
}