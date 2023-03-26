import {ProductOption} from "../models/ProductOption";
import {ProductSpecification} from "../models/ProductSpecification";

export interface UpdateProductCard {
    options: ProductOption[],
    specifications: ProductSpecification[],
    tags: [],
    productCard: {}
}