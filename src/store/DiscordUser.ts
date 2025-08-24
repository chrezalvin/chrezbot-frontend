import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from ".";
import { DiscordUser } from "../API/models/DiscordUser";

export interface DiscordUserState extends DiscordUser{
    
}

export const initialState = null as DiscordUserState | null;

export const userSlice = createSlice({
    name: 'discorduser',
    initialState,
    reducers: {
        assignDiscordUser: (_, action: PayloadAction<DiscordUserState>) => {
            return action.payload;
        }
    }
})

export const {assignDiscordUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;