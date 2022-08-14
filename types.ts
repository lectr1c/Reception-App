
type TPointsLog = {
    id?: number,
    teamName?: string,
    reason?: string,
    points?: number,
    registeredAt?: Date
}

type Team = {
    id?: number,
    name?: string,
    points?: number
}

export type {
    TPointsLog,
    Team
}