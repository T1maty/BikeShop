import {ProductFilterVariantDTO} from "./ProductFilterVariantDTO";

export interface ProductFiltersDTO {
    name: string
    variants: ProductFilterVariantDTO[]
}