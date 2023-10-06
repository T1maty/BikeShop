import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import {OrderApi} from "../../entities/api/OrderApi";
import {LocalStorage} from "../../entities";

interface p {
    orders: OrderWithProducts[]
    getOrders: () => void
    addOrder: (v: OrderWithProducts) => void
    confirm: (id: number) => void
    getStatusString: (status: string) => { s: string, style: {} }
    getDeliveryString: (status: string) => string
    collected: (id: number) => void
    currentOrder: OrderWithProducts | null
    setCurrentOrder: (v: OrderWithProducts) => void
}


const useOrderManager = create<p>()(persist(devtools(immer((set, get) => ({
    setCurrentOrder: (v) => set({currentOrder: v}),
    currentOrder: null,
    collected: (id) => {
        OrderApi.Collected(LocalStorage.userId()!, id).then(r => {
            let data = get().orders.map(n => {
                if (n.order.id === r.data.order.id) return r.data
                return n
            })
            console.log('afterUpdate:', data)
            set({orders: data})
        })
    },
    getDeliveryString: (status) => {
        switch (status) {
            case "Shipping":
                return "Доставка поштою"
            case "Pickup":
                return "Самовивіз"
            case "BLCDelivery":
                return "Доставка самостійно"
            default:
                return "Помилка статуса доставки"
        }
    },
    getStatusString: (status) => {
        switch (status) {
            case "Created":
                return {s: "Очікує підтвердження", style: {}}
            case "WaitingForPayment":
                return {s: "Очікує оплату", style: {}}
            case "WaitingForCollection":
                return {s: "На збірці", style: {backgroundColor: "#ffe756", color: "#3f3f3f"}}
            case "WaitingLogistic":
                return {s: "Очікує логістики", style: {backgroundColor: "#ffe756", color: "#3f3f3f"}}
            case "ReadyInShop":
                return {s: "Готов в магазині", style: {backgroundColor: "#84e379"}}
            case "WaitingForShipping":
                return {s: "Очікує відправлення", style: {backgroundColor: "#ffe756", color: "#3f3f3f"}}
            case "Shipped":
                return {s: "Відпарвлено", style: {backgroundColor: "#84e379"}}
            case "Finished":
                return {s: "Завершено", style: {backgroundColor: "#84e379"}}
            case "Canceled":
                return {s: "Відменено", style: {}}
            default:
                return {s: "Ошибка статуса", style: {}}
        }
    },
    confirm: (id) => {
        OrderApi.Confirm(LocalStorage.userId()!, id).then(r => {
            let data = get().orders.map(n => {
                if (n.order.id === r.data.order.id) return r.data
                return n
            })
            console.log('afterUpdate:', data)
            set({orders: data})
        })
    },
    addOrder: (v) => set(state => {
        state.orders.push(v)
    }),
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