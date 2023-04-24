import {$api} from "../../../shared"
import {InventarizationFullData} from "../../../pages/workspace/Inventarization/models/InventarizationFullData";

export const InventorizationAPI = {
    getByShop(shopId: number, take: number): any {
        return (
            $api.get<InventarizationFullData>(`inventarization/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    update(data: InventarizationFullData): any {
        return (
            $api.put<InventarizationFullData>(`inventarization/update`, data)
        )
    },
    create(shopId: number, take: number): any {
        return (
            $api.get<InventarizationFullData>(`inventarization/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
    closeAct(shopId: number, take: number): any {
        return (
            $api.get<InventarizationFullData>(`inventarization/getbyshop?ShopId=${shopId}&Take=${take}`)
        )
    },
}