import {CatalogProductItemType} from './CatalogProductItemType'

export interface CatalogProductItemTypeForCart extends CatalogProductItemType {
    productCount: number
}