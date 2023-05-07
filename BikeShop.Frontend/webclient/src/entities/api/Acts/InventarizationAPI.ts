import {$api} from "../../../shared"
import {
    InventarizationFullData
} from "../../../pages/workspace/ProductsCount/InventarizationPage/models/InventarizationFullData";

export const InventarizationAPI = {
    getByShop(shopId: number, take: number): any {
        return (
            $api.get<InventarizationFullData>(`/inventarization/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    update(data: InventarizationFullData): any {
        return (
            $api.put<InventarizationFullData>(`/inventarization/update`, data)
        )
    },
    create(shopId: number, user: string): any {
        return (
            $api.post<InventarizationFullData>(`/inventarization/create?ShopId=${shopId}&UserId=${user}`)
        )
    },
    closeAct(actId: number, user: string): any {
        return (
            $api.put<InventarizationFullData>(`inventarization/closeact?ActId=${actId}&UserId=${user}`)
        )
    },
    getLackByShop(shopId: number): any {
        return (
            $api.get<InventarizationFullData>(`/inventarization/getlackbyshop?ShopId=${shopId}`)
        )
    },
}