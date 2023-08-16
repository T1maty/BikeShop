import {$api} from "../../../shared"
import {AxiosResponse} from "axios";
import {OutcomeActWithProducts} from "../../entities/Acts/OutcomeAct/OutcomeActWithProducts";

export const OutcomeActAPI = {
    getByShop(shopId: number, take: number): Promise<AxiosResponse<OutcomeActWithProducts[]>> {
        return (
            $api.get<OutcomeActWithProducts[]>(`/outcome/getbyshop?id=${shopId}&take=${take}`)
        )
    },
    create(data: OutcomeActWithProducts): Promise<AxiosResponse<OutcomeActWithProducts>> {
        return (
            $api.post<OutcomeActWithProducts>(`/outcome/create`, data)
        )
    },
    update(data: OutcomeActWithProducts): Promise<AxiosResponse<OutcomeActWithProducts>> {
        return (
            $api.put<OutcomeActWithProducts>(`/outcome/update`, data)
        )
    },
    execute(invoiceId: number, userId: string): Promise<AxiosResponse<OutcomeActWithProducts>> {

        return $api.post<OutcomeActWithProducts>(`/outcome/execute?id=${invoiceId}&userId=${userId}`)

    },
}