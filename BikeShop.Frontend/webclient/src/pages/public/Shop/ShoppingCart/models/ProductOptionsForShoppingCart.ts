import {ProductOptionVariant} from '../../../../../entities'

export interface ProductOptionsForShoppingCart {
    id: number
    name: string
    optionVariant: ProductOptionVariant
    createdAt: string
    updatedAt: string
    enabled: boolean
}