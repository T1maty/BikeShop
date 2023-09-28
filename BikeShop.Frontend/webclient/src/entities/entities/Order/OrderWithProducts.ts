import {OrderProduct} from "./OrderProduct";
import {Order} from "./Order";
import {Payment} from "../Payment";
import {User} from "../../models/Auth/User";

export interface OrderWithProducts {
    order: Order
    payment?: Payment
    products: OrderProduct[]
    manager?: User
    client: User
    userUpdated?: User
    userCreated?: User
}