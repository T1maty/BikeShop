import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {Encashment, EncashmentAPI, LocalStorage} from '../../../entities'

interface EncashmentArchiveModalStore {
    openEncashmentArchiveModal: boolean
    setOpenEncashmentArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: Encashment[]
    getArchive: () => void
    setArchive: (v: Encashment[]) => void
    selected: Encashment | null
    setSelected: (v: Encashment) => void
}

const useEncashmentArchiveModal = create<EncashmentArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    setArchive: (v) => {
        set({archive: v})
    },
    selected: null,
    setSelected: (v) => {
        set({selected: v})
    },
    openEncashmentArchiveModal: false,
    setOpenEncashmentArchiveModal: (value) => set({
        openEncashmentArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        // заглушка
        EncashmentAPI.getByShop(LocalStorage.shopId()!, 100).then((res) => {
            set(state => {
                state.archive = res.data
                console.log('Encashment', res.data)
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "encashmentArchiveModalStore",
    version: 1
})*/);

export default useEncashmentArchiveModal;