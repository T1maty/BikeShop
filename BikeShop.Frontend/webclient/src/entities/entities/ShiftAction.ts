export interface ShiftAction {
    userId: string
    action: "Open" | "Finish" | "Pause"
    time: string
    id: number
    createdAt: string
    updatedAt: string
    enabled: boolean
}