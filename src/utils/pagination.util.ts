export const paginationLinks = (
  totalPages: number,
  page: number
): Array<string> => {
  return totalPages <= 7
    ? [
        ...Array(totalPages)
          .fill(1)
          .map((v, i) => v + i),
      ]
    : totalPages === 8 && page <= 4
    ? [
        ...Array(5)
          .fill(1)
          .map((v, i) => v + i),
        "...",
        8,
      ]
    : totalPages === 8 && page > 4
    ? [
        1,
        "...",
        ...Array(9 - 4)
          .fill(4)
          .map((v, i) => v + i),
      ]
    : totalPages > 8 && page <= 4
    ? [
        ...Array(5)
          .fill(1)
          .map((v, i) => v + i),
        "...",
        totalPages,
      ]
    : totalPages > 8 && page >= totalPages - 3
    ? [
        1,
        "...",
        ...Array(totalPages + 1 - (totalPages - 4))
          .fill(totalPages - 4)
          .map((v, i) => v + i),
      ]
    : [1, "...", page - 1, page, page + 1, "...", totalPages];
};
