import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";
import DarkModeReducer from "./ToggleDarkMode";
import UserReducer from "./User";
import SessionKeyReducer from "./SessionKey";
import discordUserReducer from "./DiscordUser";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        darkMode: DarkModeReducer,
        user: UserReducer,
        sessionKey: SessionKeyReducer,
        discordUser: discordUserReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;