export interface OrderDeliveryInfo {
    DeliveryService?: "NovaPoshta"
    Description: string
    CityName?: string
    AreaName?: string
    CityRef?: string
    SettlementType?: string
    WarehouseName?: string
    WarehouseAddress?: string
    WarehousePhone?: string
    WarehouseRef?: string
    WarehouseTypeRef?: string
}

export const OrderDeliveryInfoFields: OrderDeliveryFieldsType[] = [
    "DeliveryService",
    "Description",
    "CityName",
    "AreaName",
    "CityRef",
    "SettlementType",
    "WarehouseName",
    "WarehouseAddress",
    "WarehousePhone",
    "WarehouseRef",
    "WarehouseTypeRef",
]

export type OrderDeliveryFieldsType = keyof OrderDeliveryInfo