'use client'
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { Auth_Api } from '../RTK_API/Auth_Api';
import { Middleware } from 'redux';
import CounterSlice from '../RTK_API/Slice/CounterSlice';


export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    [Auth_Api.reducerPath]: Auth_Api.reducer,
  },
  middleware: (getDefaultMiddleware: () => Middleware[]) =>
    getDefaultMiddleware().concat(Auth_Api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


