import {AxiosResponse} from "axios/index";
import {$api} from "../../../shared";
import {ScheduleDataResponse} from "../../models/Schedule/ScheduleDataResponse";
import {ItemAndHistoryResponse} from "../../models/Schedule/ItemAndHistoryResponse";
import {CreateScheduleItem} from "../../models/Schedule/CreateScheduleItem";
import {CreateHolydayItem} from "../../models/Schedule/CreateHolydayItem";
import {ScheduleHistory} from "../../entities/Schedule/ScheduleHistory";

export const ScheduleAPI = {
    getByShop(shopId: number, start?: string, finish?: string): Promise<AxiosResponse<ScheduleDataResponse>> {
        return (
            $api.get<ScheduleDataResponse>(`/schedule/getbyshop?shopId=${shopId}&Start=${start}&Finish=${finish}`)
        )
    },
    addShift(data: CreateScheduleItem): Promise<AxiosResponse<ItemAndHistoryResponse>> {
        return (
            $api.post<ItemAndHistoryResponse>('/schedule/addshift', data)
        )
    },
    addHoliday(data: CreateHolydayItem): Promise<AxiosResponse<ItemAndHistoryResponse>> {
        return (
            $api.post<ItemAndHistoryResponse>(`/schedule/addholyday`, data)
        )
    },
    removeItem(userId: string, itemId: number): Promise<AxiosResponse<ScheduleHistory>> {
        return (
            $api.delete<ScheduleHistory>(`/schedule/removeitem?User=${userId}&ItemId=${itemId}`)
        )
    },
}