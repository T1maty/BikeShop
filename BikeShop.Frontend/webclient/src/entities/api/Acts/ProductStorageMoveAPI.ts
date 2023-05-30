import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {ProductStorageMoveFullData} from "../../models/Acts/ProductStorageMove/ProductStorageMoveFullData";

export const ProductStorageMoveAPI = {
    getByShop(shopId: string, take: number): Promise<AxiosResponse<ProductStorageMoveFullData[]>> {
        return (
            $api.get<ProductStorageMoveFullData[]>(`/productmove/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    create(): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.post<ProductStorageMoveFullData>(``)
        )
    },
    update(): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(``)
        )
    },
    transfer(): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(``)
        )
    },
    execute(): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(``)
        )
    },
}