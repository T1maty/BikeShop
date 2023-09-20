import {ProductFullData} from "./ProductFullData";
import {ProductOptionVariant} from "../DataTransferObjects/ProductOptionVariant";

export interface ProductCatalogResponse {
    products: ProductFullData[]
    page: number
    pageSize: number
    totalPages: number
    totalProducts: number
    storageId: number
    options: ProductOptionVariant[]
    sortingSettings: string[]
    filterSettings: number[]
}