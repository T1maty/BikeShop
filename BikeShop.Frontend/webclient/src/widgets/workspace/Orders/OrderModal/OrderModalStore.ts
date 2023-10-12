import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {OrderProduct} from "../../../../entities/entities/Order/OrderProduct";
import {Product} from "entities";
import {OrderWithProducts} from "../../../../entities/entities/Order/OrderWithProducts";
import {NPCityResponse} from "../../../../entities/models/NovaPoshta/Response/NPCityResponse";
import {NPWarehouseResponse} from "../../../../entities/models/NovaPoshta/Response/NPWarehouseResponse";
import {OrderDeliveryFieldsType, OrderDeliveryInfo} from "../../../../entities/models/Order/OrderDeliveryInfo";

interface p {
    orderId: number
    open: boolean
    setOpen: (v: boolean) => void
    selectedPage: 1 | 2 | 3
    setSelectedPage: (v: 1 | 2 | 3) => void
    isDirty: string[]

    productTable: OrderProduct[]
    addProduct: (p: Product, q: number) => void

    openOrderModal: (o: OrderWithProducts) => void

    selectedDeliveryOption: { code: string, name: string } | null
    setSelectedDeliveryOption: (v: { code: string, name: string } | null) => void
    NPCity: NPCityResponse | null
    setNPCity: (v: NPCityResponse | null) => void
    NPWarehouse: NPWarehouseResponse | null
    setNPWarehouse: (v: NPWarehouseResponse | null) => void

    orderDeliveryInfo: OrderDeliveryInfo
    setOrderDelivField: (field: OrderDeliveryFieldsType, value: string | undefined) => void
    updateDeliveryData: () => void
}


const useOrderModal = create<p>()(persist(devtools(immer((set, get) => ({
    updateDeliveryData: () => {
        let city = get().NPCity
        let wh = get().NPWarehouse

        let info = {...get().orderDeliveryInfo}

        if (get().selectedDeliveryOption?.code === "Shipping") info.DeliveryService = "NovaPoshta"
        if (city != null) {
            info.CityName = city.Description
            info.CityRef = city.Ref
            info.AreaName = city.AreaDescription
            info.SettlementType = city.SettlementTypeDescription
        }

        if (wh != null) {
            info.WarehouseName = wh.Description
            info.WarehouseAddress = wh.ShortAddress
            info.WarehousePhone = wh.Phone
            info.WarehouseRef = wh.Ref
            info.WarehouseTypeRef = wh.TypeOfWarehouse
        }

        set(state => {
            state.orderDeliveryInfo = info
        })
        set(state => {
            state.isDirty.push("deliveryInfo")
        })
    },
    setOrderDelivField: (field, value) => {
        set(state => { // @ts-ignore
            state.orderDeliveryInfo[field] = value
        })
        if (value === undefined) set(state => {
            delete state.orderDeliveryInfo[field]
        })
        set(state => {
            state.isDirty.push("deliveryInfo")
        })
    },
    orderDeliveryInfo: {Description: ""},
    NPCity: null,
    NPWarehouse: null,
    setNPCity: v => set({NPCity: v}),
    setNPWarehouse: v => set({NPWarehouse: v}),
    selectedDeliveryOption: null,
    setSelectedDeliveryOption: v => {
        set({selectedDeliveryOption: v})
        set({NPWarehouse: null})
        set({NPCity: null})
    },
    openOrderModal: (v) => {
        if (get().orderId != v.order.id) {
            set({isDirty: []})
            set({productTable: v.products})
            set({orderId: v.order.id})
            set({NPCity: null})
            set({NPWarehouse: null})
            set({selectedDeliveryOption: null})
            try {
                set({orderDeliveryInfo: JSON.parse(v.order.deliveryInfo) as OrderDeliveryInfo})
            } catch (e) {
                set({orderDeliveryInfo: {Description: "Введіть опис"} as OrderDeliveryInfo})
            }
            set({selectedPage: 1})
        }
        set({open: true})
    },
    orderId: 0,
    productTable: [],
    addProduct: (p, q) => {
        if (q === 0) {
            set({productTable: get().productTable.filter(n => n.productId != p.id)})
        } else {
            let f = false
            let data = get().productTable.map(n => {
                if (n.productId === p.id) {
                    f = true;
                    return {...n, quantity: n.quantity + q}
                }
                return n
            })
            if (!f) data.push({
                id: 0,
                createdAt: Date.now().toLocaleString(),
                updatedAt: Date.now().toLocaleString(),
                enabled: true,
                orderId: get().orderId,
                productId: p.id,
                description: "",
                catalogKey: p.catalogKey,
                serialNumber: "",
                name: p.name,
                quantity: q,
                quantityUnitId: p.quantityUnitId,
                quantityUnitName: p.quantityUnitName,
                price: p.retailPrice,
                discount: 0,
                total: p.retailPrice * q
            })
            data = data.filter(n => n.quantity > 0)
            set({productTable: data})
        }
        set(state => {
            state.isDirty.push("products")
        })
    },

    isDirty: [],
    setSelectedPage: (v) => set({selectedPage: v}),
    selectedPage: 1,
    open: false,
    setOpen: v => set({open: v})
}))), {
    name: "orderModal",
    version: 1
}));

export default useOrderModal;