import {Product, ProductOptionVariantBind} from "entities"

export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    bindedProducts: Product[]
}