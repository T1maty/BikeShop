import {$api} from "../../shared"
import {ProductTag} from "../models/Product/ProductTag"
import {AxiosResponse} from "axios"
import {CatalogProductItem} from "../models/Product/CatalogProductItem"

export const ShopAPI = {
    getTags(): Promise<AxiosResponse<ProductTag[]>> {
        return (
            $api.get<ProductTag[]>('/public/gettags')
        )
    },
    getDefaultProducts(): Promise<AxiosResponse<CatalogProductItem[]>> {
        return (
            $api.get<CatalogProductItem[]>('/public/defaultproducts?Quantity=10')
        )
    },
}