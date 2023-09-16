import {ScheduleItem} from "../../entities/Schedule/ScheduleItem";
import {ScheduleHistory} from "../../entities/Schedule/ScheduleHistory";

export interface ItemAndHistoryResponse {
    scheduleItem: ScheduleItem
    scheduleHistory: ScheduleHistory
}