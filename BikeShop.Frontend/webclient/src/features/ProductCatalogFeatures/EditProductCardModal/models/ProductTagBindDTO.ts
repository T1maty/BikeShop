import {ProductTag} from "../../../../entities";

export interface ProductTagBindDTO {
    productTag: ProductTag
    productId: number
    id: number
}