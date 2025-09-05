import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  filters: {
    search: '',
    role: '',
    isActive: '',
  },
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filtering
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
  },
});

export const {
  setSelectedUser,
  setFilters,
  setPagination,
  setSortBy,
  clearFilters,
} = userSlice.actions;

export default userSlice.reducer;
