import {Product, ProductOptionVariantBind, ProductSpecificationBind} from "entities"
import {ProductFilterBind} from "../../../../entities/entities/ProductFilterBind";

export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productFilters: ProductFilterBind[]
    bindedProducts: Product[]
}