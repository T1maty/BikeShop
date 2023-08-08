import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {OutcomeActWithProducts} from "../../../entities/entities/Acts/OutcomeAct/OutcomeActWithProducts";
import {OutcomeActAPI} from "../../../entities/api/Acts/OutcomeActAPI";

interface p {
    open: boolean
    setOpen: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: OutcomeActWithProducts[]
    getArchive: () => void
    setArchive: (value: OutcomeActWithProducts[]) => void

    selectedOutcomeAct: OutcomeActWithProducts | null
    setSelectedOutcomeAct: (value: OutcomeActWithProducts | null) => void


}

const useOutcomeActArchiveModal = create<p>()(/*persist(*/devtools(immer((set, get) => ({
    selectedOutcomeAct: null,
    isLoading: false,
    errorStatus: 'default',
    archive: [],

    setSelectedOutcomeAct: (value) => {
        set(state => {
            state.selectedOutcomeAct = value
        })
    },
    setArchive: (value) => {
        set({archive: value})
    },
    open: false,
    setOpen: (value) => set({
        open: value
    }),


    getArchive: () => {
        set({isLoading: true})
        OutcomeActAPI.getByShop(1, 100).then((res: any) => {
            set(state => {
                state.archive = res.data
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
    name: "useOutcomeActArchiveModal",
    version: 1
})*/);

export default useOutcomeActArchiveModal;