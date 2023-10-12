import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {LocalStorage, Product, RoleAPI, User} from "../../../../entities";
import {CreateOrder} from "../../../../entities/models/Order/CreateOrder";
import {OrderApi} from "../../../../entities/api/OrderApi";
import {OrderWithProducts} from "../../../../entities/entities/Order/OrderWithProducts";
import {NPCityResponse} from "../../../../entities/models/NovaPoshta/Response/NPCityResponse";
import {NPWarehouseResponse} from "../../../../entities/models/NovaPoshta/Response/NPWarehouseResponse";
import {OrderDeliveryInfo} from "../../../../entities/models/Order/OrderDeliveryInfo";

interface p {
    client: User | null
    setClient: (v: User) => void
    products: { p: Product, q: number } []
    addProduct: (v: Product) => void
    open: boolean,
    setOpen: (value: boolean) => void,
    incButtonHandler: (id: number) => void
    decButtonHandler: (id: number) => void
    removeButtonHandler: (id: number) => void
    isFirstPage: boolean
    setIsFirstPage: (v: boolean) => void
    clear: () => void
    deliverySelectOptions: { code: string, name: string }[]
    selectedDeliveryOption: { code: string, name: string } | null
    setSelectedDeliveryOption: (v: { code: string, name: string } | null) => void
    selectedManager: User | null
    setSelectedManager: (v: User | null) => void
    employees: User[]
    getEmployees: () => void
    isPrePay: boolean
    setIsPrePay: (v: boolean) => void
    clientInfo: string
    setClientInfo: (v: string) => void
    deliveryDescription: string
    setDeliveryDescription: (v: string) => void
    warning: string
    setWarning: (v: string) => void
    confirm: (s: (v: OrderWithProducts) => void) => void
    isLoading: boolean
    NPCity: NPCityResponse | null
    setNPCity: (v: NPCityResponse | null) => void
    NPWarehouse: NPWarehouseResponse | null
    setNPWarehouse: (v: NPWarehouseResponse | null) => void
}

const useCreateOrderModal = create<p>()(persist(devtools(immer((set, get) => ({
    NPCity: null,
    NPWarehouse: null,
    setNPCity: v => set({NPCity: v}),
    setNPWarehouse: v => set({NPWarehouse: v}),
    isLoading: false,
    confirm: (s) => {
        let client = get().client
        let products = get().products
        let deliveryType = get().selectedDeliveryOption
        let selectedManager = get().selectedManager
        let wh = get().NPWarehouse
        let city = get().NPCity

        if (client === null) {
            set({warning: "noClient"});
            return
        }
        if (products.length === 0) {
            set({warning: "noProducts"});
            return
        }
        if (deliveryType === null) {
            set({warning: "noDeliveryType"});
            return
        }
        if (selectedManager === null) {
            set({warning: "noManager"});
            return
        }
        if (deliveryType.code === "Shipping" && (wh === null || city === null)) {
            set({warning: "noDeliveryData"});
            return
        }

        let info: OrderDeliveryInfo = {
            Description: get().deliveryDescription
        }

        if (deliveryType.code === "Shipping") info.DeliveryService = "NovaPoshta"
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

        let data: CreateOrder = {
            products: products.map(n => {
                return {
                    productId: n.p.id,
                    description: "",
                    quantity: n.q,
                    discountId: 0
                }
            }),
            shopId: parseFloat(LocalStorage.shopId()!),
            deliveryType: deliveryType.code,
            deliveryInfo: JSON.stringify(info),
            descriptionCilent: get().clientInfo,
            discountId: 0,
            isPrePay: get().isPrePay,
            clientId: client.id,
            userId: LocalStorage.userId()!,
            managerId: selectedManager.id
        }

        console.log("Order:", data)
        set({isLoading: true})
        OrderApi.Create(data).then(r => {
            console.log("Res:", r.data)
            s(r.data)
            get().clear()
        }).finally(() => {
            set({isLoading: false})
        })
    },
    warning: "",
    setWarning: v => set({warning: v}),
    deliveryDescription: "",
    setDeliveryDescription: (v) => set({deliveryDescription: v}),
    clientInfo: "",
    setClientInfo: (v) => set({clientInfo: v}),
    setIsPrePay: (v) => set({isPrePay: v}),
    isPrePay: true,
    employees: [],
    getEmployees: () => {
        RoleAPI.getEmpoyeelByShop(parseFloat(LocalStorage.shopId()!)).then(r => {
            set({employees: r.data.map(n => n.user)})
        })
        if (get().selectedManager === null) {
            let man = get().employees.find(n => n.id === LocalStorage.userId())
            set({selectedManager: man})
        }
    },
    selectedManager: null,
    setSelectedManager: (v) => set({selectedManager: v}),
    selectedDeliveryOption: null,
    setSelectedDeliveryOption: v => {
        set({selectedDeliveryOption: v})
        set({NPWarehouse: null})
        set({NPCity: null})
    },
    deliverySelectOptions: [
        {code: "Pickup", name: "Самовивіз"},
        {code: "Shipping", name: "Доставка поштою"},
        {code: "BLCDelivery", name: "Доставка від магазину"}
    ],

    clear: () => {
        set({client: null})
        set({products: []})
        set({isFirstPage: true})
        set({open: false})
        set({isPrePay: true})
        set({clientInfo: ""})
        set({deliveryDescription: ""})
        set({selectedDeliveryOption: null})
        set({selectedManager: null})
    },
    isFirstPage: true,
    setIsFirstPage: v => set({isFirstPage: v}),
    incButtonHandler: (id) => {
        let data = get().products.map(n => {
            if (n.p.id === id) {
                return {p: n.p, q: n.q + 1}
            }
            return n
        })
        set({products: data})
    },
    decButtonHandler: (id) => {
        let data = get().products.map(n => {
            if (n.p.id === id) {
                return {p: n.p, q: n.q - 1}
            }
            return n
        })

        data = data.filter(n => n.q != 0)
        set({products: data})
    },
    removeButtonHandler: (id) => {
        set({products: get().products.filter(n => n.p.id != id)})
    },
    addProduct: (v) => {
        let f = false
        let data = get().products.map(n => {
            if (n.p.id === v.id) {
                f = true
                return {p: n.p, q: n.q + 1}
            }
            return n
        })
        if (!f) {
            data.push({p: v, q: 1})
        }
        set({products: data})
    },
    products: [],
    setClient: (v) => set({client: v}),
    client: null,
    open: false,
    setOpen: (v) => set({open: v}),

}))), {
    name: "createOrderModal",
    version: 1
}));

export default useCreateOrderModal;