import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {User} from '../../../entities';
import {NewBillDTO} from "./models/NewBillDTO";
import {BillProductDTO} from "./models/BillProductDTO";

interface CashboxStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    user: User
    setUser: (user: User) => void

    bill: NewBillDTO,
    setProducts: (value: BillProductDTO[]) => void
    addProduct: (value: any) => void
}

const useCashboxStore = create<CashboxStore>()(/*persist(*/devtools(immer((set) => ({
    bill: {} as NewBillDTO,
    isLoading: false,
    addProduct: (value) => {
        let newValue: BillProductDTO = {
            ...value,
            productId: value.id,
            quantity: 1,
            discount: 0,
            price: value.retailPrice
        }

        set(state => {
            state.bill.products != undefined ? state.bill.products.push(newValue) : state.bill.products = [newValue]
        })
    },
    setProducts: (value) => {
        set(state => {
            state.bill.products = value
        })
    },
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),
    user: {} as User,
    setUser: (user: User) => set({
        user: user
    }),
})))/*, {
    name: "cashboxStore",
    version: 1
})*/);

export default useCashboxStore;