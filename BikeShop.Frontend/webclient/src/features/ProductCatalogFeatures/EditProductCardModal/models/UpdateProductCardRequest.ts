import {ProductOptionVariantBind, ProductSpecificationBind} from "../../../../entities";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productImages: { id: number, sortOrder: number, enabled: boolean, image: string }[]
    productTags: string[]
}