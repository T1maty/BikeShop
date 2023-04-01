import {ProductOptionVariantBindRequest} from "./ProductOptionVariantBindRequest";
import {ProductSpecificationRequest} from "./ProductSpecificationRequest";
import {ProductImageRequest} from "./ProductImageRequest";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: { optionVariants: ProductOptionVariantBindRequest[] }[]
    productSpecifications: ProductSpecificationRequest[]
    productImages: ProductImageRequest[]
    productTags: number[]
}