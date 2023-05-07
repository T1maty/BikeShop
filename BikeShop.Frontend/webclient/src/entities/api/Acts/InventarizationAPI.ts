import {$api} from "../../../shared"
import {
    InventarizationFullData
} from "../../../pages/workspace/ProductsCount/InventarizationPage/models/InventarizationFullData";
import {AxiosResponse} from "axios";
import {
    InventoryLackFullData
} from "../../../pages/workspace/ProductsCount/InventarizationPage/models/InventoryLackFullData";

export const InventarizationAPI = {
    getByShop(shopId: number, take: number): Promise<AxiosResponse<InventarizationFullData>> {
        return (
            $api.get<InventarizationFullData>(`/inventarization/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    update(data: InventarizationFullData): Promise<AxiosResponse<InventarizationFullData>> {
        return (
            $api.put<InventarizationFullData>(`/inventarization/update`, data)
        )
    },
    create(shopId: string, user: string): Promise<AxiosResponse<InventarizationFullData>> {
        return (
            $api.post<InventarizationFullData>(`/inventarization/create?ShopId=${shopId}&UserId=${user}`)
        )
    },
    closeAct(actId: number, user: string): Promise<AxiosResponse<InventoryLackFullData>> {
        return (
            $api.put<InventoryLackFullData>(`inventarization/closeact?ActId=${actId}&UserId=${user}`)
        )
    },
    getLackByShop(shopId: string): Promise<AxiosResponse<InventoryLackFullData[]>> {
        return (
            $api.get<InventoryLackFullData[]>(`/inventarization/getlackbyshop?ShopId=${shopId}`)
        )
    },
}