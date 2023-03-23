import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {AxiosResponse} from "axios"
import {CardOption} from "../../../entities/models/CardOption"

interface EditProductCardModalStore {
    openEditProductCardModal: boolean
    setOpenEditProductCardModal: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    // currentCurrency: any // CreateShopResponse | null
    // setCurrentCurrency: (currency: any) => void
    galleryImages: any[]
    getGalleryImages: () => void
    cardOptions: CardOption[]
    getCardOptions: () => void
}

const useEditProductCardModal = create<EditProductCardModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openEditProductCardModal: false,
    setOpenEditProductCardModal: (value: boolean) => set({openEditProductCardModal: value}),
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),

    // currentCurrency: null,
    // setCurrentCurrency: (currency) => {set({currentCurrency: currency})},
    galleryImages: [],
    getGalleryImages: () => {
        return $api.get('/productcard/getalloptions').then(res => {
            // set(state => {
            //     state.cardOptions = res.data
            //     console.log('все опции', state.cardOptions)
            // })
        }).catch((error: any) => {
            console.log('фото не получены')
        })
    },
    cardOptions: [],
    getCardOptions: () => {
        return $api.get<CardOption[]>('/productcard/getalloptions').then(res => {
            set(state => {
                state.cardOptions = res.data
                console.log('все опции', state.cardOptions)
            })
        }).catch((error: any) => {
            console.log('магазины не получены')
        })
    },
})))/*, {
    name: "editProductCardModal",
    version: 1
})*/);

export default useEditProductCardModal;