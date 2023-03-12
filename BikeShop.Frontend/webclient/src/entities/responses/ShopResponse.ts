import {CreateShop} from "../requests/CreateShop";

export interface CreateShopResponse extends CreateShop {
    id: 1
    enabled: boolean
    createdAt: string
    updatedAt: string
}