import Enumerable from 'linq'
import {BillProductDTO} from '../../../pages/workspace/Cashbox/models/BillProductDTO'
import {Product} from '../../../entities'
import useCashboxStore from '../../../pages/workspace/Cashbox/CashboxStore'

export const asyncSelectSearchProductF = (n: Product) => {

    const setData = useCashboxStore(s => s.setProducts)
    const bill = useCashboxStore(s => s.bill)

    let exProd = Enumerable.from(bill.products)
        .where(m => m.productId === n.id)
        .firstOrDefault()

    if (exProd !== undefined) {
        setData(bill.products.map((m) => {
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
            quantityUnitName: "123",
            currencySymbol: "123",
            price: n.retailPrice,
            discount: 0,
            total: n.retailPrice
        }
        console.log('selectedProd', n)
        setData([...bill.products, newProd])
    }
}