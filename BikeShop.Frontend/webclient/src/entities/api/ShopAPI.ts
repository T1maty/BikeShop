import {$api} from "../../shared"
import {ProductTag} from "../entities/ProductTag"
import {AxiosResponse} from "axios"
import {CatalogProductItemType} from "../models/Product/CatalogProductItemType"

export const ShopAPI = {
    getTags(): Promise<AxiosResponse<ProductTag[]>> {
        return (
            $api.get<ProductTag[]>('/public/gettags')
        )
    },
    getDefaultProducts(): Promise<AxiosResponse<CatalogProductItemType[]>> {
        return (
            $api.get<CatalogProductItemType[]>('/public/defaultproducts?Quantity=10')
        )
    },
}