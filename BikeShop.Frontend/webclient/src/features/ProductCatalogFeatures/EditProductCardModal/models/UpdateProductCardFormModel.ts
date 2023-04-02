import {ProductImage, ProductSpecificationBind, ProductTag} from "entities"
import {ProductOptionsWithVariants} from "./ProductOptionsWithVariants";


export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionsWithVariants[]
    productSpecifications: ProductSpecificationBind[]
    productImages: ProductImage[]
    productTags: ProductTag[]
}