import { Button, TextField } from '@material-ui/core'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { SortingRule } from 'react-table'
import styled from 'styled-components'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { generateSortQuery } from '../../../shared/utils'
import { fetchRushingStatistics } from '../../../api/client'
// eslint-disable-next-line max-len
import { IRushingStatisticsResponseData } from '../../../model/rushingStatistics'
import Table, { FetchDataProps } from '../../Table/TableLayout'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 64px;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        height: 35px;
    }
`

type RushingStatisticProps = {
    rushingData: IRushingStatisticsResponseData
}

const RushingStatisticsContainer: FC<RushingStatisticProps> = ({
    rushingData,
}) => {
    const [data, setData] = useState(rushingData)
    const [filterName, setFilterName] = useState('')
    const [sort, setSort] = useState<SortingRule<Record<string, unknown>>[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const onChangeFilterName = (e: { target: { value: any } }) => {
        const newFilterName = e.target.value
        setFilterName(newFilterName)
        const queryString = generateSortQuery(sort)
        fetchRushingStatistics(
            `page=${currentPage}&player=${newFilterName}&${queryString}`
        ).then((res) => setData(res))
    }

    const handleDownloadData = () => {
        const queryString = generateSortQuery(sort)
        fetch(
            // eslint-disable-next-line max-len
            `http://localhost:5000/api/v1/download?player=${filterName}&${queryString}`
        ).then((response) => {
            response.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'rushingStatistics.csv'
                document.body.appendChild(a)
                a.click()
                a.remove()
            })
        })
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Player',
                accessor: 'Player',
                disableSortBy: true,
            },
            {
                Header: 'Team',
                accessor: 'Team',
                disableSortBy: true,
            },
            {
                Header: 'Position',
                accessor: 'Pos',
                disableSortBy: true,
            },
            {
                Header: 'Rushing Attempts Per Game Average',
                accessor: 'Att/G',
                disableSortBy: true,
            },
            {
                Header: 'Rushing Attempts',
                accessor: 'Att',
                disableSortBy: true,
            },
            {
                Header: 'Total Rushing Yards',
                accessor: 'Yds',
                canSort: true,
            },
            {
                Header: 'Rushing Average Yards Per Attempt',
                accessor: 'Avg',
                disableSortBy: true,
            },
            {
                Header: 'Rushing Yards Per Game',
                accessor: 'Yds/G',
                disableSortBy: true,
            },
            {
                Header: 'Total Rushing Touchdowns',
                accessor: 'TD',
                canSort: true,
            },
            {
                Header: 'Longest Rush',
                accessor: 'Lng',
                canSort: true,
            },
            {
                Header: 'Touchdown',
                accessor: 'TDOccured',
                disableSortBy: true,
            },
            {
                Header: 'Rushing First Downs',
                accessor: '1st',
                disableSortBy: true,
            },
            {
                Header: 'Rushing First Down Percentage',
                accessor: '1st%',
                disableSortBy: true,
            },
            {
                Header: 'Rushing 20+ Yards Each',
                accessor: '20+',
                disableSortBy: true,
            },
            {
                Header: 'Rushing 40+ Yards Each',
                accessor: '40+',
                disableSortBy: true,
            },
            {
                Header: 'Rushing Fumbles',
                accessor: 'FUM',
                disableSortBy: true,
            },
        ],
        []
    )

    const fetchIdRef = useRef(0)

    const fetchData = useCallback(
        ({ pageIndex, sortBy }: FetchDataProps) => {
            const queryString = generateSortQuery(sort)
            // eslint-disable-next-line no-plusplus
            const fetchId = ++fetchIdRef.current

            // Set the loading state
            setLoading(true)

            if (fetchId === fetchIdRef.current) {
                setCurrentPage(pageIndex)
                fetchRushingStatistics(
                    `page=${pageIndex}&player=${filterName}&${queryString}`
                ).then((res) => setData(res))
                if (sortBy.length > 0) {
                    setSort(sortBy)
                }
            }
            setLoading(false)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterName]
    )

    useDeepCompareEffect(() => {
        const queryString = generateSortQuery(sort)
        fetchRushingStatistics(
            `page=${currentPage}&player=${filterName}&${queryString}`
        ).then((res) => setData(res))
    }, [sort])

    return (
        <Wrapper>
            <Header>
                <StyledTextField
                    variant="outlined"
                    placeholder="Filter by Player's name"
                    value={filterName}
                    onChange={onChangeFilterName}
                />
                <Button
                    onClick={handleDownloadData}
                    variant="contained"
                    color="primary"
                >
                    Download Players Statistics
                </Button>
            </Header>
            <Table
                columns={columns}
                data={data.rushingStatistics}
                fetchData={fetchData}
                loading={loading}
                pageCount={data.totalPages}
            />
        </Wrapper>
    )
}

export default RushingStatisticsContainer
