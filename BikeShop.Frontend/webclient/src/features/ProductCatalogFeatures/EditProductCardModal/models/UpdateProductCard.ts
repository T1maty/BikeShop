import {ProductOption} from "./ProductOption"
import {ProductSpecification} from "../api/EditProductCardModalAPI"

export interface UpdateProductCard {
    options: ProductOption[]
    specifications: ProductSpecification[]
    tags: []
    productCard: {}
}