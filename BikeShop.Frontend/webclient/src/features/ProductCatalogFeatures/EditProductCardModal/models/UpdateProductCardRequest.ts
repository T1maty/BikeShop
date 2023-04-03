import {ProductOptionVariantBind, ProductSpecificationBind} from "../../../../entities";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: { optionVariants: ProductOptionVariantBind[] }[]
    productSpecifications: ProductSpecificationBind[]
    productTags: string[]
}