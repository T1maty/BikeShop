import {ProductCard, ProductImage, ProductOption, ProductSpecification, ProductTagForCard} from "entities"


export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: ProductCard
    productOptions: ProductOption[]
    productSpecifications: ProductSpecification[]
    productImages: ProductImage[]
    productTags: ProductTagForCard[]
}