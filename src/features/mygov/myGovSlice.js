import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    VAX_LIVE_COUNT: null,
    error: {
        VAX_LIVE_COUNT: null
    },
    status: {
        VAX_LIVE_COUNT: "idle"
    }
}

export const fetchVaxLiveCount = createAsyncThunk('myGov/vaxLiveCount',
    async () => {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v1/reports/getLiveVaccination');
        return response.data.count;
    });

export const myGovSlice = createSlice({
    name: 'myGov',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVaxLiveCount.fulfilled]: (state, action) => {
            state.VAX_LIVE_COUNT = action.payload;
            state.status.VAX_LIVE_COUNT = "succeeded";
            state.error.VAX_LIVE_COUNT = null;
        },
        [fetchVaxLiveCount.rejected]: (state, action) => {
            state.error.VAX_LIVE_COUNT = action.error.message;
            state.status.VAX_LIVE_COUNT = "failed";
        }
    }
});

export const selectVaxLiveCount = (state) => state.myGov.VAX_LIVE_COUNT;

export default myGovSlice.reducer;
