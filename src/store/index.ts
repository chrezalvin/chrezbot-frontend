import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";
import DarkModeReducer from "./ToggleDarkMode";
import UserReducer from "./User";
import SessionKeyReducer from "./SessionKey";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        darkMode: DarkModeReducer,
        user: UserReducer,
        sessionKey: SessionKeyReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;