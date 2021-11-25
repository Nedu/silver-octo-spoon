/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect } from 'react'
import {
    Button,
    Table as MaUTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import {
    Column,
    useFilters,
    useSortBy,
    useTable,
    usePagination,
    SortingRule,
    useAsyncDebounce,
    Filters,
} from 'react-table'
import styled from 'styled-components'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

import { IRushingStatisticsData } from '../../model/rushingStatistics'

const TableHeaderCell = styled(TableCell)`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.08px;
    line-height: 21.98px;
    color: rgba(0, 0, 0, 0.87);
`

const FocusedTableCell = styled(TableCell)`
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.11px;
    line-height: 20px;
`

const StyledTable = styled(MaUTable)`
    border-radius: 4px;
    margin-top: 2em;
    border-collapse: separate;
    max-width: 100%;
    overflow-x: auto;
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1em;
    margin-left: 1em;
`

const PaginationButton = styled(Button)`
    margin-right: 1em;
`

const EmptyTableRow = styled(TableRow)`
    width: '100%';
`

const EmptyTableCell = styled(TableCell)`
    text-align: center !important;
    font-size: 16px;
`

export type FetchDataProps = {
    pageIndex: number
    pageSize: number
    filters: Filters<Record<string, unknown>>
    sortBy: SortingRule<Record<string, unknown>>[]
}

export type TableProps = {
    columns: Column[]
    data: IRushingStatisticsData[]
    fetchData: (value: FetchDataProps) => void
    loading: boolean
    pageCount: number
    emptyMessage?: string
    getHeaderProps?: (value: unknown) => Record<string, unknown>
    getColumnProps?: (value: unknown) => Record<string, unknown>
    getRowProps?: (value: unknown) => Record<string, unknown>
    getCellProps?: (value: unknown) => Record<string, unknown>
}

// Create a default prop getter
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const defaultPropGetter = () => ({})

const Table: FC<TableProps> = ({
    columns,
    data,
    getRowProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    fetchData,
    pageCount: controlledPageCount,
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        prepareRow,
        visibleColumns,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { filters, pageIndex, pageSize, sortBy },
    } = useTable(
        {
            columns,
            data,
            manualSortBy: true,
            manualFilters: true,
            initialState: { pageIndex: 1 },
            manualPagination: true,
            autoResetPage: false,
            autoResetSortBy: false,
            autoResetFilters: false,
            pageCount: controlledPageCount,
        },
        useFilters,
        useSortBy,
        usePagination
    )

    // Debounce our onFetchData call for 100ms
    const onFetchDataDebounced = useAsyncDebounce(fetchData, 100)

    // Listen for changes in pagination and sorting fetch our new data
    useEffect(() => {
        onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters })
    }, [sortBy, pageIndex, pageSize, onFetchDataDebounced, filters])

    return (
        <>
            <StyledTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableHeaderCell
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <div style={{ display: 'flex' }}>
                                                <ArrowDownward />
                                                {column.render('Header')}
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex' }}>
                                                <ArrowUpward />
                                                {column.render('Header')}
                                            </div>
                                        )
                                    ) : (
                                        <div>{column.render('Header')}</div>
                                    )}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.length > 0 ? (
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <TableRow
                                    {...row.getRowProps(getRowProps(row))}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <FocusedTableCell
                                                {...cell.getCellProps([
                                                    getColumnProps(cell.column),
                                                    getCellProps(cell),
                                                ])}
                                            >
                                                {cell.render('Cell')}
                                            </FocusedTableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })
                    ) : (
                        <EmptyTableRow>
                            <EmptyTableCell colSpan={visibleColumns.length}>
                                No data exists
                            </EmptyTableCell>
                        </EmptyTableRow>
                    )}
                </TableBody>
            </StyledTable>
            {data.length > 0 && (
                <PaginationWrapper>
                    <PaginationButton
                        variant="contained"
                        onClick={() => gotoPage(1)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </PaginationButton>
                    <PaginationButton
                        variant="contained"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {'<'}
                    </PaginationButton>
                    <PaginationContainer>
                        Page{' '}
                        <strong>
                            {' '}
                            {` ${pageIndex} of ${pageOptions.length}`}
                        </strong>
                    </PaginationContainer>
                    <PaginationContainer>
                        Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex}
                            onChange={(e) => {
                                const newPage = e.target.value
                                    ? Number(e.target.value)
                                    : 1
                                gotoPage(newPage)
                            }}
                            style={{ width: '100px' }}
                        />
                    </PaginationContainer>
                    <PaginationButton
                        variant="contained"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {'>'}
                    </PaginationButton>
                    <PaginationButton
                        variant="contained"
                        onClick={() => gotoPage(pageCount)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </PaginationButton>
                </PaginationWrapper>
            )}
        </>
    )
}

export default Table
