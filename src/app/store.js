import { configureStore } from '@reduxjs/toolkit';
import cowinReducer from "../features/Cowin/cowinSlice";
import settingsReducer from "../features/settings/settingsSlice";
import myGovReducer from "../features/mygov/myGovSlice";

export const store = configureStore({
    reducer: {
        cowin: cowinReducer,
        myGov: myGovReducer,
        settings: settingsReducer,
    },
});