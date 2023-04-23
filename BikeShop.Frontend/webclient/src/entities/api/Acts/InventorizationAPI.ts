import {$api} from "../../../shared"
import {InventarizationFullData} from "../../../pages/workspace/Inventarization/models/InventarizationFullData";

export const InventorizationAPI = {
    getByShop(shopId: number, take: number): any {
        return (
            $api.get<InventarizationFullData>(`/inventorization/getbyshop?id=${shopId}&take=${take}`)
        )
    },
}