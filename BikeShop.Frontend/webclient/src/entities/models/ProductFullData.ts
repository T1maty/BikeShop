import {Product} from "../entities/Product"
import {ProductCard} from "../entities/ProductCard"
import {ProductSpecificationBind} from "../entities/ProductSpecificationBind"
import {ProductOptionVariantBind} from "./Product/ProductOptionVariantBind"
import {ProductImage} from "../entities/ProductImage"
import {ProductCategory} from "../entities/ProductCategory";
import {ProductFilterBind} from "../entities/ProductFilterBind";

export interface ProductFullData {
    product: Product
    productCard: ProductCard
    productSpecifications: ProductSpecificationBind[]
    productOptions: ProductOptionVariantBind[]
    productImages: ProductImage[]
    productCategory: ProductCategory
    productFilters: ProductFilterBind[]
    bindedProducts: Product[]
}