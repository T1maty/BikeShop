import {Inventarization, InventarizationProduct} from "../../../../../entities"

export interface InventarizationFullData {
    inventarization: Inventarization
    products: InventarizationProduct[]
}