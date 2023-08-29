import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {Discount} from "../../entities/entities/Discount";
import {DiscountAPI} from "../../entities/api/DiscountAPI";
import {LocalStorage} from "../../entities";

interface ChooseDiscountModalStore {
    isLoading: boolean
    getDiscountsByTarget: (target: string) => void
    discountsList: Discount[]
}

const useChooseDiscountModal = create<ChooseDiscountModalStore>()(persist(devtools(immer((set) => ({
    isLoading: false,
    discountsList: [],
    getDiscountsByTarget: (target) => {
        set({isLoading: true})
        DiscountAPI.getDiscountsByTarget(target, LocalStorage.userId()!).then(n => {
            set({discountsList: n.data})
        }).finally(() => {
            set({isLoading: false})
        })
    }
}))), {
    name: "chooseDiscountModalStore",
    version: 1
}));

export default useChooseDiscountModal;