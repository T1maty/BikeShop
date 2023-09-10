import {ProductCategory} from "../DataTransferObjects/ProductCategory";

export interface ProductTagWithChildrens {
    tag: ProductCategory
    childrens: ProductTagWithChildrens[]
    childrenIds: number[]
}