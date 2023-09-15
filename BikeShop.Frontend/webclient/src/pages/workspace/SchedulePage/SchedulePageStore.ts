import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {LocalStorage, RoleAPI, Shop, ShopAPI, User} from "../../../entities";
import {ScheduleItem} from "../../../entities/entities/Schedule/ScheduleItem";
import {ScheduleAPI} from "../../../entities/api/Schedule/ScheduleAPI";

interface p {
    scheduleItems: ScheduleItem[]
    getScheduleItems: () => void
    shops: Shop[]
    selectedShop: Shop | null
    setSelectedShop: (v: Shop) => void
    getUsers: (shopId: number) => void
    users: User[]
    getShops: () => void

    hoveredItem: ScheduleItem | null
    setHoveredItem: (v: ScheduleItem | null) => void
    deleteItem: (itemId: number) => void
}

const useSchedule = create<p>()(persist(devtools(immer((set, get) => ({
    setHoveredItem: (v) => set({hoveredItem: v}),
    hoveredItem: null,
    deleteItem: (itemId) => {
        ScheduleAPI.removeItem(LocalStorage.userId()!, itemId).then(r => {
            set(state => {
                state.scheduleItems = state.scheduleItems.filter(n => n.id != itemId)
            })
        })
    },

    scheduleItems: [],
    getScheduleItems: () => {
        ScheduleAPI.getByShop(LocalStorage.shopId()!).then(r => {
            console.log(r.data.scheduleItems)
            set({scheduleItems: r.data.scheduleItems})
        })
    },
    getUsers: (v) => {
        RoleAPI.getEmpoyeelByShop(v).then(r => {
            set({users: r.data.map(g => g.user)})
        })
    },
    setSelectedShop: (v) => {
        set({selectedShop: v})
        get().getUsers(v.id)
    },
    selectedShop: null,
    users: [],
    shops: [],
    getShops: () => {
        ShopAPI.getAll().then(r => {
            console.log(r.data)
            set({shops: r.data})
        })
    }
}))), {
    name: "useSchedule",
    version: 1
}));

export default useSchedule;