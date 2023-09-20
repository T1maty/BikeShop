import {Product} from "../DataTransferObjects/Product"
import {ProductCard} from "../DataTransferObjects/ProductCard"
import {ProductOptionVariantBind} from "./Product/ProductOptionVariantBind"
import {ProductImage} from "../DataTransferObjects/ProductImage"
import {ProductCategory} from "../DataTransferObjects/ProductCategory";

export interface ProductFullData {
    product: Product
    productCard: ProductCard
    productOptions: ProductOptionVariantBind[]
    productImages: ProductImage[]
    productCategory: ProductCategory
    bindedProducts: Product[]
    productStorageQuantity: { [key: number]: { [subKey: number]: number } };
    productStorageReserved: { [key: number]: { [subKey: number]: number } };
}