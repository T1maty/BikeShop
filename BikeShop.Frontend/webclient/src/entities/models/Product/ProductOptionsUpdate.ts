import {ProductOptionVariantBind} from "./ProductOptionVariantBind"

export interface ProductOptionsUpdate {
    id: number
    name: string
    optionVariants: ProductOptionVariantBind[]
    createdAt: string
    updatedAt: string
    enabled: boolean
}