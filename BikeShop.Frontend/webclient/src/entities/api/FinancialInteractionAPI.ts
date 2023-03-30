import {$api} from "../../shared";
import {NewBillDTO} from "../../pages/workspace/Cashbox/models/NewBillDTO";

export const FinancialInteractionAPI = {
    NewBill: {
        create(data: NewBillDTO) {
            return (
                $api.post('/financialinteraction/newbill', data)
            )
        },
    }
}