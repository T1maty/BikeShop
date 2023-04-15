import {Product} from "../entities/Product"
import {ProductCard} from "../entities/ProductCard"
import {ProductSpecificationBind} from "../entities/ProductSpecificationBind"
import {ProductOptionVariantBind} from "./Product/ProductOptionVariantBind"
import {ProductImage} from "../entities/ProductImage"
import {ProductTagBindDTO} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/ProductTagBindDTO";

export interface ProductFullData {
    product: Product
    productCard: ProductCard
    productSpecifications: ProductSpecificationBind[]
    productOptions: ProductOptionVariantBind[]
    productImages: ProductImage[]
    productTags: ProductTagBindDTO[]
    bindedProducts: Product[]
}