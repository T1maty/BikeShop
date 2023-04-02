import {ProductCard, ProductImage, ProductSpecification, ProductTagForCard} from "entities"
import {ProductOptionsWithVariants} from "./ProductOptionsWithVariants";


export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: ProductCard
    productOptions: ProductOptionsWithVariants[]
    productSpecifications: ProductSpecification[]
    productImages: ProductImage[]
    productTags: ProductTagForCard[]
}