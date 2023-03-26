import {ProductOptionVariant} from "./ProductOptionVariant";

export interface ProductOption {


    id: number,

    name: string,
    optionVariants: ProductOptionVariant[]

    createdAt: string,
    updatedAt: string,
    enabled: boolean
}