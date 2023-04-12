import {ProductOptionVariantBind} from "./ProductOptionVariantBind"
import {ProductFullData} from "../ProductFullData"

export interface ShoppingCartProductType extends ProductFullData {
    productQuantity: number
    productTotalSum: number
    selectedProductOptions: ProductOptionVariantBind[]
}