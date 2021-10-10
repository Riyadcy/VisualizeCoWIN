import { configureStore } from '@reduxjs/toolkit';
import cowinReducer from "../features/Cowin/cowinSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        cowin: cowinReducer,
        settings: settingsReducer,
    },
});