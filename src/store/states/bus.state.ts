import { BusFilters, BusResponse } from "../../dashboard/domain/interfaces/bus";
import { Pagination } from "../../dashboard/domain/interfaces/pagination";

export interface BusState {
  data: Array<BusResponse>;
  pagination: Pagination;
  busData: BusResponse | null;
  filters: BusFilters;
  reqFilters: BusFilters;
  isLoading: boolean;
  errors: Array<{ error: string; msg: string }> | null;
}
