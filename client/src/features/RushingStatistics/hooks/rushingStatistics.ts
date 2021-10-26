import { useQuery } from 'react-query'
// eslint-disable-next-line max-len
import { IRushingStatisticsResponseData } from '../../../model/rushingStatistics'

import { fetchRushingStatistics } from '../../../api/client'

export const useRushingStatisticsQuery = () =>
    useQuery<IRushingStatisticsResponseData, Error>(['rushingStatistics'], () =>
        fetchRushingStatistics()
    )

export const useRushingStatisticsWithFilterQuery = (query: string) =>
    useQuery(['rushingStatistics', query], () => fetchRushingStatistics(query))
