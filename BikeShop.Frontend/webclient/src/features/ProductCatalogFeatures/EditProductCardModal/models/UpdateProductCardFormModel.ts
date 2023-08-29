import {Product, ProductOptionVariantBind, ProductSpecificationBind} from "entities"
import {ProductFilter} from "../../../../entities/entities/ProductFilter";

export interface UpdateProductCardFormModel {
    id: number
    checkStatus: string
    productCard: { description: string, shortDescription: string }
    productOptions: ProductOptionVariantBind[]
    productSpecifications: ProductSpecificationBind[]
    productFilters: ProductFilter[]
    bindedProducts: Product[]
}