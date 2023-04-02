import {ProductOptionsWithVariants} from "./ProductOptionsWithVariants";
import {ProductSpecificationBind} from "../../../../entities";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionsWithVariants[]
    productSpecifications: ProductSpecificationBind[]
    productImages: { id: number, sortOrder: number, enabled: boolean, image: string }[]
    productTags: number[]
}