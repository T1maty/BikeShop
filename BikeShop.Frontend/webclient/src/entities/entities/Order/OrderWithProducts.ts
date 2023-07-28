import {OrderProduct} from "./OrderProduct";
import {Order} from "./Order";

export interface OrderWithProducts {
    order: Order
    products: OrderProduct[]
}