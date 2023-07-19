import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {SalaryAPI, User} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {CalculatedSalary} from "../../../entities/models/CalculatedSalary";

interface StuffProfileStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    user: User
    getUser: () => void

    calculateData: CalculatedSalary | null
    calculate: (userId: string) => void
}

// стор на всякий случай
const useStuffProfile = create<StuffProfileStore>()(/*persist(*/devtools(immer((set, get) => ({
    calculateData: null,
    isLoading: false,
    errorStatus: 'default',

    calculate: (u) => {
        SalaryAPI.history(u).then((r1) => {
            console.log("paymentsHistory:", r1)
            SalaryAPI.calculateSalary(u, r1.data[0] ? r1.data[0].time : "1/1/0001 12:00:00 AM", "1/1/0001 12:00:00 AM").then(r => {
                console.log("currentSalary", r.data)
                set({calculateData: r.data})
            })
        })

    },
    user: {} as User,
    getUser: () => {
        // set({isLoading: true})
        // ArchiveAPI.getArchive().then((res: any) => {
        //     set(state => {
        //         state.archive = res.data
        //     })
        //     set({isLoading: false})
        // }).catch((error: any) => {
        //     set({errorStatus: 'error'})
        // }).finally(() => {
        //     set({errorStatus: 'default'})
        //     set({isLoading: false})
        // })
    },
})))/*, {
    name: "stuffProfileStore",
    version: 1
})*/);

export default useStuffProfile;