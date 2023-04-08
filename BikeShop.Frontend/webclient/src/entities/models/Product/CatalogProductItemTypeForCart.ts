import {CatalogProductItemType} from './CatalogProductItemType'

export interface CatalogProductItemTypeForCart extends CatalogProductItemType {
    productQuantity: number
    productTotalSum: number
}