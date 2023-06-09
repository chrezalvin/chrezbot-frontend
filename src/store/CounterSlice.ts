import {createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";

export interface CounterState {
    value: number
}

export const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => { ++state.value; },
        decrement: (state) => { --state.value; },
    }
})

export const {decrement, increment} = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;