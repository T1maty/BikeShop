import {Product} from "../entities/Product"
import {ProductCard} from "../entities/ProductCard"
import {ProductOptionVariantBind} from "./Product/ProductOptionVariantBind"
import {ProductImage} from "../entities/ProductImage"
import {ProductCategory} from "../entities/ProductCategory";

export interface ProductFullData {
    product: Product
    productCard: ProductCard
    productOptions: ProductOptionVariantBind[]
    productImages: ProductImage[]
    productCategory: ProductCategory
    bindedProducts: Product[]
}