import { SortingRule } from 'react-table'

export const generateSortQuery = (
    sort: SortingRule<Record<string, unknown>>[]
) => {
    let queryString = 'sort='
    sort.map((sortOption, idx) => {
        if (idx !== sort.length - 1) {
            queryString += `${sortOption.id}:${
                sortOption.desc ? 'desc' : 'asc'
            },`
        } else {
            queryString += `${sortOption.id}:${
                sortOption.desc ? 'desc' : 'asc'
            }`
        }
        return queryString
    })
    return queryString
}
