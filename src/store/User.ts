import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../API/models";

export interface UserState extends User{
    
}

export const initialState = null as UserState | null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        assignUser: (_, action: PayloadAction<UserState>) => {
            return action.payload;
        }
    }
})

export const {assignUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;