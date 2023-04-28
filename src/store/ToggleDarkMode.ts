import {createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";

export interface DarkModeState {
    value: boolean;
}

export const initialState: DarkModeState = {
    value: true
}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggle: (state) => { state.value = !state.value; },
    }
})

export const {toggle} = darkModeSlice.actions;
export const selectDarkMode = (state: RootState) => state.counter.value;
export default darkModeSlice.reducer;