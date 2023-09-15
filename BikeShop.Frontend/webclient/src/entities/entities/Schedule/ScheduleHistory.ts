export interface ScheduleHistory {
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean

    action: string;
    actionUser: string;
    actionUserFIO: string;
    actionTargetUser: string;
    actionTargetUserFIO: string;
    isHolydayPrev: boolean;
    timeStartPrev: string;
    timeFinishPrev: string;
    isHolydayActual: boolean;
    timeStartActual: string;
    timeFinishActual: string;
    itemId: number;
}