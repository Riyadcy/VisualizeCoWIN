import { configureStore } from '@reduxjs/toolkit';
import cowinReducer from "../features/Cowin/cowinSlice";

export const store = configureStore({
    reducer: {
        cowin: cowinReducer,
    },
});