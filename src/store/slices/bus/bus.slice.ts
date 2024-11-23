import { createSlice } from "@reduxjs/toolkit";
import { BusState } from "../../states/bus.state";

const initialState: BusState = {
  data: [],
  pagination: {
    totalDocs: 0,
    totalPages: 0,
    prevPage: 0,
    nextPage: 0,
    totalElements: 0,
    numberOfElements: 0,
    page: 0,
    size: 0,
    sort: "",
    hasPrevPage: false,
    hasNextPage: false,
    prevLink: "",
    nextLink: "",
  },
  busData: null,
  filters: {
    size: 10,
    page: 0,
    sort: "busFecCre,DESC",
    direction: "DESC",
  },
  reqFilters: {},
  isLoading: false,
  errors: null,
};

export const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.errors = null;
      state.isLoading = true;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    setBusPagination: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.filters = {
        ...state.filters,
        direction: state.pagination.sort.split(",")[1],
      };
      state.reqFilters = action.payload.filters;
      state.isLoading = false;
    },
    setBusData: (state, action) => {
      state.busData = action.payload;
      state.isLoading = false;
    },
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const {
  startLoading,
  setErrors,
  setBusPagination,
  setBusData,
  changeFilters,
} = busSlice.actions;
