import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";

import defaultLogo from "../logo.svg";

export interface UserState{
    username: string;
    discordID: string;
    avatarURL?: string;
}

export const initialState: UserState = {
    username: "",
    discordID: "",
    avatarURL: defaultLogo
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        assign: (state, action: PayloadAction<UserState>) => {
            state.discordID = action.payload.discordID;
            state.username = action.payload.username;
            if(action.payload.avatarURL === undefined)
                state.avatarURL = defaultLogo;
            else
                state.avatarURL = `https://cdn.discordapp.com/avatars/${action.payload.discordID}/${action.payload.avatarURL}.webp`;
        }
    }
})

export const {assign} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;