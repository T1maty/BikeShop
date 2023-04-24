import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../entities/enumerables/ErrorStatusTypes"

interface EndWorkDayModalStore {
    openEndWorkDayModal: boolean
    setOpenEndWorkDayModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: any[]
    getArchive: () => void
}

const useEndWorkDayModal = create<EndWorkDayModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEndWorkDayModal: false,
    setOpenEndWorkDayModal: (value) => set({
        openEndWorkDayModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
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
    name: endWorkDayModalStore",
    version: 1
})*/);

export default useEndWorkDayModal;