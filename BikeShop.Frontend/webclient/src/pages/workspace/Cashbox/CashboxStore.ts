import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {BillWithProducts, FinancialInteractionAPI, LocalStorage, PaymentData, Product, User} from '../../../entities'
import {NewBillDTO} from "./models/NewBillDTO"
import {BillProductDTO} from "./models/BillProductDTO"
import Enumerable from "linq"

interface CashboxStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void

    bill: NewBillDTO
    user: User | null
    setUser: (user: User) => void

    setProducts: (value: BillProductDTO[]) => void
    addProduct: (value: Product) => void
    paymentHandler: (data: PaymentData, onSuccess: (r: BillWithProducts) => void) => void

    sum: number
    setSum: (v: number) => void
}

const useCashboxStore = create<CashboxStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({
        isLoading: value
    }),

    bill: {} as NewBillDTO,
    user: null,
    setUser: (user) => set({
        user: user
    }),

    setProducts: (value) => {
        set(state => {
            let data = value.filter(n => n.quantity != 0)
            data.forEach(n => n.total = n.price * n.quantity - n.discount)
            state.bill.products = data
        })
    },
    addProduct: (n) => {
        let bill = get().bill
        let exProd = Enumerable.from(bill.products)
            .where(m => m.productId === n.id)
            .firstOrDefault()

        if (exProd !== undefined) {
            get().setProducts(bill.products.map((m) => {
                if (m.productId === n.id) {
                    return {...m, quantity: m.quantity + 1}
                } else {
                    return m
                }
            }))
        } else {
            let newProd: BillProductDTO = {
                productId: n.id,
                name: n.name,
                catalogKey: n.catalogKey,
                serialNumber: '',
                description: '',
                quantity: 1,
                currencyId: 1,
                quantityUnitName: n.quantityUnitName,
                currencySymbol: LocalStorage.currency.symbol()!,
                price: n.retailPrice,
                discount: 0,
                total: n.retailPrice
            }
            console.log('selectedProd', n)
            get().setProducts([...bill.products, newProd])
        }
    },
    paymentHandler: (data, onSuccess) => {
        let bill = get().bill
        let res = {...bill, ...data}
        res.userId = LocalStorage.userId()!
        res.description = ''
        res.shopId = LocalStorage.shopId()!
        res.currencyId = LocalStorage.currency.id()
        console.log(res)
        set({isLoading: true})

        FinancialInteractionAPI.NewBill.create(res).then((r) => {
            set({isLoading: false})
            onSuccess(r.data)
        }).finally(() => {
            set({isLoading: false})
        })
    },

    sum: 0,
    setSum: (v) => {
        set({sum: v})
    },
}))), {
    name: "cashboxStore",
    version: 1
}));

export default useCashboxStore;