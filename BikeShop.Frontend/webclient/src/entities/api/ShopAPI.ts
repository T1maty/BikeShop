import {$api} from "../../shared"
import {ProductTag} from "../entities/ProductTag"
import {AxiosResponse} from "axios"
import {ProductFullData} from "../models/ProductFullData"

export const ShopAPI = {
    getTags(): Promise<AxiosResponse<ProductTag[]>> {
        return (
            $api.get<ProductTag[]>('/public/gettags')
        )
    },
    getDefaultProducts(): Promise<AxiosResponse<ProductFullData[]>> {
        return (
            $api.get<ProductFullData[]>('/public/defaultproducts?Quantity=10')
        )
    },
}