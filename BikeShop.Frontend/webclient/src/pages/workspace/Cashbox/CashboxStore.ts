import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {User} from '../../../entities'
import {NewBillDTO} from "./models/NewBillDTO"
import {BillProductDTO} from "./models/BillProductDTO"

interface CashboxStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    bill: NewBillDTO
    user: User
    setUser: (user: User) => void

    products: any[]
    setProducts: (value: BillProductDTO[]) => void
    addProduct: (value: any) => void
}

const useCashboxStore = create<CashboxStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({
        isLoading: value
    }),

    bill: {} as NewBillDTO,
    user: {} as User,
    setUser: (user) => set({
        user: user
    }),

    products: [],
    setProducts: (value) => {
        set(state => {
            state.bill.products = value
        })
    },
    addProduct: (value) => {
        let newValue: BillProductDTO = {
            ...value,
            productId: value.id,
            quantity: 1,
            discount: 0,
            price: value.retailPrice
        }

        let all = [...(get().bill.products != undefined ? get().bill.products : [])]
        let ent = all?.find(n => n.productId === newValue.productId)
        if (ent != undefined) {
            let index = all.indexOf(ent)
            let quant = ent.quantity

            set(state => {
                state.bill.products[index].quantity = quant + 1
            })
        } else {
            set(state => {
                state.bill.products != undefined ?

                    state.bill.products.push(newValue)
                    :
                    state.bill.products = [newValue]
            })
        }

    },
}))), {
    name: "cashboxStore",
    version: 1
}));

export default useCashboxStore;