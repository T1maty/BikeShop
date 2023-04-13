import {Product, ProductOptionVariantBind, ProductSpecificationBind, ProductTag} from "entities"

export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productTags: ProductTag[]
    bindedProducts: Product[]
}