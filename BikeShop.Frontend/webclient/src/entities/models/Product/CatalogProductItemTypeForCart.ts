import {CatalogProductItemType} from './CatalogProductItemType'
import {ProductOptionVariantBind} from "./ProductOptionVariantBind";

export interface CatalogProductItemTypeForCart extends CatalogProductItemType {
    productQuantity: number
    productTotalSum: number
    selectedProductOptions: ProductOptionVariantBind[]
}