import {ProductOptionVariant} from "../../../../entities"

export interface ProductOptionsWithVariants {
    id: number
    name: string
    optionVariants: ProductOptionVariant[]
    createdAt: string
    updatedAt: string
    enabled: boolean
}