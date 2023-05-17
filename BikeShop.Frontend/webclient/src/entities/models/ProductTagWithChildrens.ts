import {ProductTag} from "../entities/ProductTag";

export interface ProductTagWithChildrens {
    tag: ProductTag
    childrens: ProductTagWithChildrens[]
    childrenIds: string[]
}