import {CatalogProductItemType} from './CatalogProductItemType'
import {ProductOptionsForShoppingCart} from '../../../pages/public/Shop/ShoppingCart/models/ProductOptionsForShoppingCart'

export interface CatalogProductItemTypeForCart extends CatalogProductItemType {
    productQuantity: number
    productTotalSum: number
    selectedProductOptions: ProductOptionsForShoppingCart[]
}