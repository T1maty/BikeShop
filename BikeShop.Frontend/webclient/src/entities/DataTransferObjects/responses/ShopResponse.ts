import {CreateShop} from "../requests/CreateShop";

export interface CreateShopResponse extends CreateShop {
    id: number
    enabled: boolean
    createdAt: string
    updatedAt: string
}