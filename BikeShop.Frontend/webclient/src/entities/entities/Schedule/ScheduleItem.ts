export interface ScheduleItem {
    id: number
    createdAt: Date
    updatedAt: Date
    enabled: boolean

    role: string;
    isHolyday: boolean;
    timeStart: Date;
    timeFinish: Date;
    targetUser: string;
    targetUserFIO: string;
    createdUser: string;
    createdUserFIO: string;
    updatedUser: string;
    updatedUserFIO: string;
}