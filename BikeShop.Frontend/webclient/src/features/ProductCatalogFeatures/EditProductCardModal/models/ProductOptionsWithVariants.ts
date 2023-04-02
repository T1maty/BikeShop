import {ProductOptionVariant} from "../../../../entities";

export interface ProductOptionsWithVariants {
    id: number

    name: string
    variants: ProductOptionVariant[]
    createdAt: string
    updatedAt: string
    enabled: boolean
}