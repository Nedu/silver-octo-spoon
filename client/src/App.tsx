/* eslint-disable max-len */
import { FC } from 'react'
import { useRushingStatisticsQuery } from './features/RushingStatistics/hooks/rushingStatistics'
import RushingStatisticsContainer from './features/RushingStatistics/containers/RushingStatistics'

const App: FC = () => {
    const { isLoading, data, error } = useRushingStatisticsQuery()

    if (isLoading || !data) {
        return <div>Loading...</div>
    }

    if (error) return <div>{`An error has occurred: ${error}`}</div>

    return <RushingStatisticsContainer rushingData={data} />
}

export default App
