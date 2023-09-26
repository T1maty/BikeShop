import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {LocalStorage, RoleAPI, Shop, ShopAPI, User} from "../../../entities";
import {ScheduleItem} from "../../../entities/entities/Schedule/ScheduleItem";
import {ScheduleAPI} from "../../../entities/api/Schedule/ScheduleAPI";
import {CreateScheduleItem} from "../../../entities/models/Schedule/CreateScheduleItem";
import {CreateHolydayItem} from "../../../entities/models/Schedule/CreateHolydayItem";
import {ScheduleHistory} from "../../../entities/entities/Schedule/ScheduleHistory";

interface p {
    scheduleItems: ScheduleItem[]
    scheduleHistory: ScheduleHistory[]
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

    itemContext: { o: boolean, x: number, y: number }
    setItemContext: (v: { o: boolean, x: number, y: number }) => void
    itemContextEmpty: { o: boolean, x: number, y: number }
    setItemContextEmpty: (v: { o: boolean, x: number, y: number }) => void

    role: string
    setRole: (v: string) => void
}

const useSchedule = create<p>()(persist(devtools(immer((set, get) => ({
    scheduleHistory: [],
    role: "Менеджер",
    setRole: (v) => set({role: v}),
    itemContext: {o: false, x: 0, y: 0},
    setItemContext: (v) => set({itemContext: v}),
    itemContextEmpty: {o: false, x: 0, y: 0},
    setItemContextEmpty: (v) => set({itemContextEmpty: v}),
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
            date: get().selectedDay!.toISOString().replace('Z', "-03:00")
        }
        set({isLoading: true})
        ScheduleAPI.addHoliday(data).then(r => {
            console.log(r.data.scheduleItem)
            set({
                scheduleItems: [...get().scheduleItems, r.data.scheduleItem],
                scheduleHistory: [r.data.scheduleHistory, ...get().scheduleHistory]
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
        let w1 = new Date(year, month, day)
        let w2 = new Date(year, month, day)
        w1.setHours(parseFloat(g[0].split(":")[0]) + 3, parseFloat(g[0].split(":")[1]))
        w2.setHours(parseFloat(g[1].split(":")[0]) + 3, parseFloat(g[1].split(":")[1]))

        let data: CreateScheduleItem = {
            shopId: s?.id!,
            user: LocalStorage.userId()!,
            targetUser: get().selectedUser?.id!,
            start: w1.toISOString().replace('Z', "+03:00"),
            finish: w2.toISOString().replace('Z', "+03:00"),
            role: get().role
        }
        set({isLoading: true})
        ScheduleAPI.addShift(data).then(r => {
            set(state => {
                state.scheduleItems.push(r.data.scheduleItem)
                state.scheduleHistory.unshift(r.data.scheduleHistory)
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
                state.scheduleHistory.unshift(r.data)
            })
        }).finally(() => set({isLoading: false}))
    },

    scheduleItems: [],
    getScheduleItems: () => {
        let s = get().selectedShop
        ScheduleAPI.getByShop(s?.id!).then(r => {
            console.log(r.data.scheduleItems)
            set({scheduleItems: r.data.scheduleItems})
            set({scheduleHistory: r.data.scheduleHistories.reverse()})
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