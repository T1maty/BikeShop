import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {LocalStorage, SalaryAPI, User} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {CalculatedSalary} from "../../../entities/models/CalculatedSalary";

interface StuffProfileStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    user: User
    getUser: () => void

    calculateData: CalculatedSalary | null
    calculate: () => void
}

// стор на всякий случай
const useStuffProfile = create<StuffProfileStore>()(/*persist(*/devtools(immer((set, get) => ({
    calculateData: null,
    isLoading: false,
    errorStatus: 'default',

    calculate: () => {
        SalaryAPI.calculateSalary(LocalStorage.userId()!, "03/01/2009 05:42:00", "12/05/2023 13:34:00").then(r => {
            console.log(r.data)
            set({calculateData: r.data})
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