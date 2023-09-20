import {ProductFullData} from "./ProductFullData";
import {ProductOptionVariantBind} from "entities";

export interface ProductCatalogResponse {
    products: ProductFullData
    page: number
    pageSize: number
    totalPages: number
    totalProducts: number
    storageId: number
    options: ProductOptionVariantBind[]
    
}