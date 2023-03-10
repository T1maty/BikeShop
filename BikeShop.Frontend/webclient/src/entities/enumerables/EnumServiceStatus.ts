interface IEnumServiceStatus {
    Waiting: string,
    WaitingSupply: string,
    InProcess: string,
    Ready: string,
    Ended: string,
    Canceled: string,
    Deleted: string,
}

export const EnumServiceStatus: IEnumServiceStatus = {
    Waiting: "Waiting",
    WaitingSupply: "WaitingSupply",
    InProcess: "InProcess",
    Ready: "Ready",
    Ended: "Ended",
    Canceled: "Canceled",
    Deleted: "Deleted",
}