import {ProductCategory} from "../entities/ProductCategory";

export interface ProductTagWithChildrens {
    tag: ProductCategory
    childrens: ProductTagWithChildrens[]
    childrenIds: number[]
}