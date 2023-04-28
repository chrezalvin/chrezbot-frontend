import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";

export interface SessionKeyInterface {
    key: string;
}

export const initialState: SessionKeyInterface = {
    key: ""
}

export const sessionKeySlice = createSlice({
    name: 'sessionkey',
    initialState,
    reducers: {
        assign: (state, action: PayloadAction<SessionKeyInterface>) => { state.key = action.payload.key; },
    }
})

export const {assign} = sessionKeySlice.actions;
export const selectSessionKey = (state: RootState) => state.counter.value;
export default sessionKeySlice.reducer;