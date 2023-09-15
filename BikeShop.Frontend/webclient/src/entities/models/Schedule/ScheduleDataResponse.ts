import {ScheduleItem} from "../../entities/Schedule/ScheduleItem";
import {ScheduleHistory} from "../../entities/Schedule/ScheduleHistory";

export interface ScheduleDataResponse {
    shopId: number;
    shopName: string;
    scheduleItems: ScheduleItem[];
    scheduleHistories: ScheduleHistory[];
    start: string;
    finish: string;
}