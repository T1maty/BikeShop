import {ProductStorageMove} from "./ProductStorageMove";
import {ProductStorageMoveProduct} from "./ProductStorageMoveProduct";

export interface ProductStorageMoveFullData {
    productMove: ProductStorageMove
    products: ProductStorageMoveProduct[]
}