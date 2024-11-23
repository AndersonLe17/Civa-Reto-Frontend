export interface Pagination {
  totalDocs: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  size: number;
  sort: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevLink: string;
  nextLink: string;
}
