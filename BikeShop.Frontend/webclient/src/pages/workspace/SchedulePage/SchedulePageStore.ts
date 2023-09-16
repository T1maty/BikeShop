import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {LocalStorage, RoleAPI, Shop, ShopAPI, User} from "../../../entities";
import {ScheduleItem} from "../../../entities/entities/Schedule/ScheduleItem";
import {ScheduleAPI} from "../../../entities/api/Schedule/ScheduleAPI";
import {CreateScheduleItem} from "../../../entities/models/Schedule/CreateScheduleItem";
import {CreateHolydayItem} from "../../../entities/models/Schedule/CreateHolydayItem";

interface p {
    scheduleItems: ScheduleItem[]
    getScheduleItems: () => void
    shops: Shop[]
    selectedShop: Shop | null
    setSelectedShop: (v: Shop) => void
    getUsers: (shopId: number) => void
    users: User[]
    getShops: () => void

    timePickerValue: Date | string | null | [Date | string | null, Date | string | null]
    setTimePickerValue: (v: Date | string | null | [Date | string | null, Date | string | null]) => void

    selectedUser: User | null
    setSelectedUser: (v: User | null) => void

    selectedDay: Date | null
    setSelectedDay: (v: Date) => void
    selectedItem: ScheduleItem | null
    setSelectedItem: (v: ScheduleItem | null) => void
    hoveredItem: ScheduleItem | null
    setHoveredItem: (v: ScheduleItem | null) => void
    deleteItem: (itemId: number) => void

    createShift: () => void
    createHoliday: () => void

    isLoading: boolean
    setIsLoading: (v: boolean) => void
}

const useSchedule = create<p>()(persist(devtools(immer((set, get) => ({
    selectedUser: null,
    setSelectedUser: (v) => set({selectedUser: v}),
    timePickerValue: ["10:00", "10:00"],
    setTimePickerValue: (v) => set({timePickerValue: v}),
    selectedDay: null,
    setSelectedDay: (v) => {
        set({selectedDay: v})
    },
    selectedItem: null,
    setSelectedItem: (v) => set({selectedItem: v}),
    isLoading: false,
    setIsLoading: (v) => set({isLoading: v}),
    createHoliday: () => {
        console.log(get().selectedDay!.toLocaleDateString())
        let data: CreateHolydayItem = {
            shopId: get().selectedShop?.id!,
            user: LocalStorage.userId()!,
            targetUser: get().selectedUser?.id!,
            date: get().selectedDay!.toISOString()
        }
        set({isLoading: true})
        ScheduleAPI.addHoliday(data).then(r => {
            console.log(r.data.scheduleItem)
            set({
                scheduleItems: [...get().scheduleItems, r.data.scheduleItem]
            })
        }).finally(() => set({isLoading: false}))
    },
    createShift: () => {
        let s = get().selectedShop

        let date = get().selectedDay
        const year = date!.getFullYear();
        const month = date!.getMonth();
        const day = date!.getDate();

        let g = get().timePickerValue as [string, string]
        let w = new Date(year, month, day)
        w.setHours(parseFloat(g[0].split(":")[0]), parseFloat(g[0].split(":")[1]))

        let data: CreateScheduleItem = {
            shopId: s?.id!,
            user: LocalStorage.userId()!,
            targetUser: get().selectedUser?.id!,
            start: "string",
            finish: "string",
            role: ""
        }
        set({isLoading: false})
        ScheduleAPI.addShift(data).then(r => {
            set(state => {
                state.scheduleItems.push(r.data.scheduleItem)
            })
        }).finally(() => set({isLoading: false}))
    },
    setHoveredItem: (v) => set({hoveredItem: v}),
    hoveredItem: null,
    deleteItem: (itemId) => {
        set({isLoading: true})
        ScheduleAPI.removeItem(LocalStorage.userId()!, itemId).then(r => {
            set(state => {
                state.scheduleItems = state.scheduleItems.filter(n => n.id != itemId)
            })
        }).finally(() => set({isLoading: false}))
    },

    scheduleItems: [],
    getScheduleItems: () => {
        let s = get().selectedShop
        ScheduleAPI.getByShop(s?.id!).then(r => {
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