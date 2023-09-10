import {$api} from "../../shared"
import {AxiosResponse} from "axios"
import {ProductFullData} from "../models/ProductFullData"
import {ProductCategory} from "../DataTransferObjects/ProductCategory";

export const ShopAPI = {
    getTags(): Promise<AxiosResponse<ProductCategory[]>> {
        return (
            $api.get<ProductCategory[]>('/public/getcategories')
        )
    },
    getDefaultProducts(): Promise<AxiosResponse<ProductFullData[]>> {
        return (
            $api.get<ProductFullData[]>('/public/defaultproducts?Quantity=10')
        )
    },
    getStorageId(shopId: number): Promise<AxiosResponse<number>> {
        return (
            $api.get<number>(`/shop/getstorageid?ShopId=${shopId}`)
        )
    },
    getCatalogProductsByTag(tags: string[]): Promise<AxiosResponse<ProductFullData[]>> {
        return (
            $api.post<ProductFullData[]>(`/public/getproducts`, tags)
        )
    },
}