interface IEnProductCheckStatus {
    justCreatedByUser: string
    justCreatedByScript: string
    partiallyFilledByUser: string
    partiallyFilledByScript: string
    filledByUser: string
    filledByScript: string
    confirmed: string
}

export const EnumProductCheckStatus: IEnProductCheckStatus = {
    justCreatedByUser: "JustCreatedByUser",
    justCreatedByScript: "JustCreatedByScript",
    partiallyFilledByUser: "PartiallyFilledByUser",
    partiallyFilledByScript: "PartiallyFilledByScript",
    filledByUser: "FilledByUser",
    filledByScript: "FilledByScript",
    confirmed: "Confirmed",
}