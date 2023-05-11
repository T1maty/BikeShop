import {$api} from "../../shared";
import {NewBillDTO} from "../../pages/workspace/Cashbox/models/NewBillDTO";
import {AxiosResponse} from "axios";
import {BillWithProducts} from "../models/BillWithProducts";

export const FinancialInteractionAPI = {
    NewBill: {
        create(data: NewBillDTO) {
            return (
                $api.post<BillWithProducts>('/financialinteraction/newbill', data)
            )
        },
    },
    getByShop(shopId: string, take: number): Promise<AxiosResponse<BillWithProducts[]>> {
        return $api.get<BillWithProducts[]>(`/financialinteraction/getbillsbyshop?ShopId=${shopId}&Take=${take}`)

    },
}