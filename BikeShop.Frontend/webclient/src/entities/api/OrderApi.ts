import {$api} from "../../shared";
import {OrderWithProducts} from "../entities/Order/OrderWithProducts";
import {AxiosResponse} from "axios/index";

export const OrderApi = {
    //returns all 0 and shopId orders wich not closed
    //if 0, return all orders wich not closed
    GetByShop(shopId: string): Promise<AxiosResponse<OrderWithProducts[]>> {
        return (
            $api.get<OrderWithProducts[]>(`/order/getbyshop?ShopId=${shopId}`)
        )
    },
}