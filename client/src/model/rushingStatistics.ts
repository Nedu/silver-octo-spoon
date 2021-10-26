export interface IRushingStatisticsData {
    id: string
    Player: string
    Team: string
    Pos: string
    Att: number
    ['Att/G']: number
    Yds: number
    Avg: number
    ['Yds/G']: number
    TD: number
    Lng: string
    TDOccured: boolean
    ['1st']: number
    ['1st%']: number
    ['20+']: number
    ['40+']: number
    FUM: number
}

export interface IRushingStatisticsResponseData {
    rushingStatistics: IRushingStatisticsData[]
    currentPage: number
    nextPage: number | null
    previousPage: number | null
    totalItems: number
    totalPages: number
}

export interface IRushingStatisticsResponse {
    status: number
    data: IRushingStatisticsResponseData
}
