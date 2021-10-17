import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    VAX_LIVE_COUNT: 0,
    VAX_STATS: {},
    CASE_COUNTS: {},
    error: {
        VAX_LIVE_COUNT: null,
        VAX_STATS: null,
        CASE_COUNTS: null
    },
    status: {
        VAX_LIVE_COUNT: "idle",
        VAX_STATS: "idle",
        CASE_COUNTS: "idle"
    }
}

export const fetchVaxLiveCount = createAsyncThunk('myGov/vaxLiveCount',
    async () => {
        // The other return statement can be used for testing chartjs re-render issue when API is down
        const response = await axios.get('https://cdn-api.co-vin.in/api/v1/reports/getLiveVaccination');
        return response.data.count;
        // return Math.floor(100000 + Math.random() * 900000).toString();
    });

export const fetchVaxStats = createAsyncThunk('myGov/vaxStats',
    async ({timestamp}) => {
        const response = await axios.get('http://127.0.0.1:5000/mygov/vaccination-stats');
        return response.data;
    });

export const fetchCaseCounts = createAsyncThunk('myGov/caseCounts',
    async () => {
        const response = await axios.get('http://127.0.0.1:5000/mygov/case-counts');
        // console.log(response.data)
        return response.data
    })

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
        },
        [fetchVaxStats.fulfilled]: (state, action) => {
            state.VAX_STATS = action.payload;
            state.status.VAX_STATS = "succeeded";
            state.error.VAX_STATS = null;
        },
        [fetchVaxStats.rejected]: (state, action) => {
            state.error.VAX_STATS = action.error.message;
            state.status.VAX_STATS = "failed";
        },
        [fetchCaseCounts.fulfilled]: (state, action) => {
            state.error.CASE_COUNTS = null;
            state.status.CASE_COUNTS = "succeeded"
            state.CASE_COUNTS = action.payload;
        },
        [fetchCaseCounts.rejected]: (state, action) => {
            state.error.CASE_COUNTS = action.error.message;
            state.status.CASE_COUNTS = "failed"
        }
    }
});

export const selectVaxLiveCount = (state) => state.myGov.VAX_LIVE_COUNT;
export const selectVaxStats = (state) => state.myGov.VAX_STATS;
export const selectCaseCounts = (state) => state.myGov.CASE_COUNTS;

export default myGovSlice.reducer;
