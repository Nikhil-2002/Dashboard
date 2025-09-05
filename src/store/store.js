import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './api/usersApi';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;
