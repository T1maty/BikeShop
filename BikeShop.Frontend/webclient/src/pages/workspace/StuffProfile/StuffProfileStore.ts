import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {User} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface StuffProfileStore {
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    user: User
    getUser: () => void
}

// стор на всякий случай
const useStuffProfile = create<StuffProfileStore>()(/*persist(*/devtools(immer((set, get) => ({
    isLoading: false,
    errorStatus: 'default',

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