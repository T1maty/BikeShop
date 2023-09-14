import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {RoleAPI, Shop, ShopAPI, User} from "../../../entities";

interface p {
    shops: Shop[]
    selectedShop: Shop | null
    setSelectedShop: (v: Shop) => void
    getUsers: (shopId: number) => void
    users: User[]
    getShops: () => void
}

const useSchedule = create<p>()(persist(devtools(immer((set, get) => ({
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