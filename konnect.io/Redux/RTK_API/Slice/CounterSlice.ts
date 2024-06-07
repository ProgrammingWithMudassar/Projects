'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

interface CounterState { ID: number; }


const initialState: CounterState = {
  ID: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthenticUserData: (state, action) => { }
      
  },
});

export const { setAuthenticUserData } = counterSlice.actions;
export default counterSlice.reducer;
