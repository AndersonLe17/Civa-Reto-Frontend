import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { busFindById, busListPagination } from "../../store/slices/bus";
import { useEffect } from "react";
import { BusFilters } from "../domain/interfaces/bus";

export const useBus = () => {
  const { filters, reqFilters } = useSelector((state: RootState) => state.bus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(busListPagination(filters));
  }, []);

  const searchBus = (id: string) => {
    dispatch(busFindById(parseInt(id)));
  };

  const searchHandler = (tableFilter?: BusFilters) => {
    if (tableFilter) {
      if (tableFilter.size) tableFilter.page = 0;
      dispatch(busListPagination({ ...reqFilters, ...tableFilter }));
    } else dispatch(busListPagination({ ...filters, page: 0 }));
  };

  return { searchBus, searchHandler, reqFilters };
};
