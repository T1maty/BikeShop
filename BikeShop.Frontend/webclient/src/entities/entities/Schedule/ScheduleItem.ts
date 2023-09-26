export interface ScheduleItem {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean

    role: string;
    isHolyday: boolean;
    timeStart: string;
    timeFinish: string;
    targetUser: string;
    targetUserFIO: string;
    createdUser: string;
    createdUserFIO: string;
    updatedUser: string;
    updatedUserFIO: string;
    shopId: number

    shiftFirstStart?: string
    shiftLastFinish?: string
    finishedSpan: string
    siftStatus: string
}