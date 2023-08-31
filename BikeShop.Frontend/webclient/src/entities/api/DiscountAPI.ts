import {$api} from "../../shared";
import {AxiosResponse} from "axios";
import {Discount} from "../entities/Discount";

export const DiscountAPI = {
    getDiscountsByTarget(target: string, user: string): Promise<AxiosResponse<Discount[]>> {
        return (
            $api.get<Discount[]>(`/discount/getbytarget?target=${target}&user=${user}`)
        )
    },
    calculateDiscount(discountId: number, target: string, startPrice: number): Promise<AxiosResponse<number>> {
        return (
            $api.get<number>(`/discount/calculate?discountId=${discountId}&target=${target}&startPrice=${startPrice}`)
        )
    },
}