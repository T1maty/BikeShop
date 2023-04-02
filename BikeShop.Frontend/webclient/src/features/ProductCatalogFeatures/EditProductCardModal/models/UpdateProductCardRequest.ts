import {ProductOptionVariantBind, ProductSpecificationBind} from "../../../../entities";
import {ProductImageRequest} from "./ProductImageRequest";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: { optionVariants: ProductOptionVariantBind[] }[]
    productSpecifications: ProductSpecificationBind[]
    productImages: ProductImageRequest[]
    productTags: string[]
}