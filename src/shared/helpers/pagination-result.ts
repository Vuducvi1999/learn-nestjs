type PaginationInput<T> = {
  total: number;
  currentPage: number;
  limit: number;
  data: T[];
};

export const paginationResult = <T>({
  total,
  currentPage,
  limit,
  data,
}: PaginationInput<T>) => ({
  total,
  currentPage,
  limit,
  nextPage: total > currentPage * limit ? currentPage + 1 : null,
  data,
});
