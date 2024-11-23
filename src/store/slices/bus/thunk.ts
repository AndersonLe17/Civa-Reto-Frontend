import { axiosAuth } from "../../../config";
import { BusFilters } from "../../../dashboard/domain/interfaces/bus";
import { filterToQuery } from "../../../utils";
import { AppDispatch, RootState } from "../../store";
import { setBusData, setBusPagination, setErrors, startLoading } from "./bus.slice";

export type AuthData = {
  username: string;
  password: string;
};

export const busListPagination = (filters: BusFilters) => {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(startLoading());
    // TODO: realizar peticion http
    const res = await axiosAuth
      .get(`/bus?${filterToQuery(filters)}`)
      .then((res) => res.data.payload)
      .catch((err) => err.response.data);

    if (res.code === 401) {
      dispatch(setErrors(res.errors));
      return;
    }

    const { data } = res;
    const {
      totalDocs,
      totalPages,
      prevPage,
      nextPage,
      totalElements,
      numberOfElements,
      page,
      size,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
      sort,
    } = res;
    dispatch(
      setBusPagination({
        data,
        filters,
        pagination: {
          totalDocs,
          totalPages,
          prevPage,
          nextPage,
          totalElements,
          numberOfElements,
          page,
          size,
          sort,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
        },
      })
    );
  };
};

export const busFindById = (busId: number) => {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(startLoading());
    // TODO: realizar peticion http
    const res = await axiosAuth
      .get(`/bus/${busId}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (res.code === 500) {
      dispatch(setErrors(res.errors));
      return;
    }

    dispatch(setBusData(res.payload));
  };
};