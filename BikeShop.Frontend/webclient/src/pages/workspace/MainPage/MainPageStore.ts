import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {User} from '../../../entities'

interface MainPageStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    isClientChosen: boolean
    setIsClientChosen: (value: boolean) => void
    user: User | null
    setUser: (user: User) => void
}

const useMainPageStore = create<MainPageStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({isLoading: value}),
    isClientChosen: false,
    setIsClientChosen: (value) => set({isClientChosen: value}),
    user: null,
    setUser: (user: User) => set({user: user}),
})))/*, {
    name: "mainPageStore",
    version: 1
})*/);

export default useMainPageStore;