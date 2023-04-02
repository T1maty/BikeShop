import {ProductSpecificationBind, ProductTag} from "entities"
import {ProductOptionsWithVariants} from "./ProductOptionsWithVariants";
import {ProductImageRequest} from "./ProductImageRequest";


export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionsWithVariants[]
    productSpecifications: ProductSpecificationBind[]
    productImages: ProductImageRequest[]
    productTags: ProductTag[]
}