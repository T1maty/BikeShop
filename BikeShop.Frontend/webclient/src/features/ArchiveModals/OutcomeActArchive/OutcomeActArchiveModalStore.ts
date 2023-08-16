import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {OutcomeActWithProducts} from "../../../entities/entities/Acts/OutcomeAct/OutcomeActWithProducts";
import {OutcomeActAPI} from "../../../entities/api/Acts/OutcomeActAPI";
import {LocalStorage} from "../../../entities";

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

    executeHandler: (s: () => void, f: () => void) => void
}

const useOutcomeActArchiveModal = create<p>()(/*persist(*/devtools(immer((set, get) => ({
    selectedOutcomeAct: null,
    isLoading: false,
    errorStatus: 'default',
    archive: [],

    executeHandler: (s, f) => {
        set({isLoading: true})

        if (get().selectedOutcomeAct != null) {
            OutcomeActAPI.execute(get().selectedOutcomeAct?.outcomeAct.id!, LocalStorage.userId()!).then((r) => {
                let newData = get().archive.map((n) => {
                    if (n.outcomeAct.id === r.data.outcomeAct.id) return r.data
                    else return n
                })

                get().setArchive(newData)
                s()
            }).catch(() => {
                f()
                set({errorStatus: 'error'})
            }).finally(() => {
                set({errorStatus: 'default'})
                set({isLoading: false})
            })
        }
    },
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