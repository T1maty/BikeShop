interface IEnProductCheckStatus {
    justCreatedByUser: string
    justCreatedByScript: string
    partialyFilledByUser: string
    partialyFilledByScript: string
    filledByUser: string
    filledByScript: string
    confirmed: string
}

export const EnumProductCheckStatus: IEnProductCheckStatus = {
    justCreatedByUser: "JustCreatedByUser",
    justCreatedByScript: "JustCreatedByScript",
    partialyFilledByUser: "PartialyFilledByUser",
    partialyFilledByScript: "PartialyFilledByScript",
    filledByUser: "FilledByUser",
    filledByScript: "FilledByScript",
    confirmed: "Confirmed",
}