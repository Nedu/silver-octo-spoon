import axios from 'axios'

import {
    IRushingStatisticsResponse,
    IRushingStatisticsResponseData,
} from '../model/rushingStatistics'

export const fetchRushingStatistics = async (
    query?: string
): Promise<IRushingStatisticsResponseData> => {
    const response = await axios.get<IRushingStatisticsResponse>(
        `http://localhost:5000/api/v1/rushingStatistics?${query || ''}`
    )
    return response.data.data
}
