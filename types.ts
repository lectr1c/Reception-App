
type TPointsLog = {
    _id?: number,
    teamName?: string,
    reason?: string,
    points?: number,
    registeredAt?: Date
}

type Team = {
    _id?: number,
    name?: string,
    points?: number
}

export type {
    TPointsLog,
    Team
}