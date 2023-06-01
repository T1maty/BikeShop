import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {ProductStorageMoveFullData} from "../../models/Acts/ProductStorageMove/ProductStorageMoveFullData";

export const ProductStorageMoveAPI = {
    getByShop(shopId: string, take: number): Promise<AxiosResponse<ProductStorageMoveFullData[]>> {
        return (
            $api.get<ProductStorageMoveFullData[]>(`/productmove/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    create(data: ProductStorageMoveFullData): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.post<ProductStorageMoveFullData>(`/productmove/create`, data)
        )
    },
    update(data: ProductStorageMoveFullData): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(`/productmove/update`, data)
        )
    },
    transfer(actId: number, userId: string): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(`productmove/transfer?ActId=${actId}&User=${userId}`)
        )
    },
    execute(actId: number, userId: string): Promise<AxiosResponse<ProductStorageMoveFullData>> {
        return (
            $api.put<ProductStorageMoveFullData>(`/productmove/execute?ActId=${actId}&User=${userId}`)
        )
    },
}