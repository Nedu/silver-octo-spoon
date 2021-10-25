import { IRushingStatistics } from "src/utils/interfaces";

const LIMIT_SIZE = 50

const getNextPage = (page: number, limit: number, total: number) => {
    if ((total/limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page: number) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}

export const getPagination = (page: string, size: string) => {
  const limit = size ? +size : LIMIT_SIZE;
  const offset = page ? (parseInt(page) * limit) - limit : 0;

  return { limit, offset };
};

export const getPagingData = (data: IRushingStatistics, page: string, limit: number) => {
  const { count: totalItems, rows: rushingStatistics } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  const previousPage = getPreviousPage(currentPage);
  const nextPage = getNextPage(currentPage, limit, totalItems);

  return { totalItems, totalPages, currentPage, previousPage, nextPage, rushingStatistics };
};