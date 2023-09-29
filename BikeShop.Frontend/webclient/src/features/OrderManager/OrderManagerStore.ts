import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import {OrderApi} from "../../entities/api/OrderApi";

interface p {
    orders: OrderWithProducts[]
    getOrders: () => void
}

const useOrderManager = create<p>()(persist(devtools(immer((set, get) => ({
    orders: [],
    getOrders: () => {
        OrderApi.GetByShop("0").then(n => {
            console.log("Заказы", n.data)
            set({orders: n.data})
        })
    }
}))), {
    name: "orderManager",
    version: 1
}));

export default useOrderManager;