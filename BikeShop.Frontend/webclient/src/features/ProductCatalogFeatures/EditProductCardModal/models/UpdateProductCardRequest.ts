import {Product, ProductOptionVariantBind, ProductSpecificationBind} from "../../../../entities"
import {ProductTagBindDTO} from "./ProductTagBindDTO";

export interface UpdateProductCardRequest {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productTags: ProductTagBindDTO[]
    bindedProducts: Product[]
}