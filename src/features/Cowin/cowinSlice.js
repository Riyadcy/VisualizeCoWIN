import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    states: [],
    districts: [],
    selected: {
        stateEnt: {
            stateName: "Select a State",
            stateId: null
        },
        districtEnt: {
            districtName: "Select a District",
            districtId: null
        },
    },
    calendarByDistrict: {
        centers: []
    },
    vaccinationReports: {},
    status: {
        states: 'idle',
        districts: 'idle',
        calendarByDistrict: 'idle',
        vaccinationReports: 'idle'
    },
    error: {
        states: null,
        districts: null,
        calendarByDistrict: null,
        vaccinationReports: null
    },
    filters: {
        keywords: [],
        feeType: {
            "Free": true,
            "Paid": true
        }
    }
}

export const fetchCalendarByDistrict = createAsyncThunk('cowin/calendarByDistrict',
    async ({districtId, date}) => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=
            ${districtId}&date=${date}`);
    return response.data;
});

export const fetchStates = createAsyncThunk('cowin/fetchStates',
    async () => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/states`);
    return response.data;
});

export const fetchDistricts = createAsyncThunk('cowin/fetchDistricts',
    async ({stateId}) => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
    return response.data;
});

export const fetchVaccinationReports = createAsyncThunk('cowin/fetchVaccinationReports',
    async ({stateId, districtId, date}) => {
        const response = await axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?
        state_id=${stateId}&district_id=${districtId}&date=${date}`);
        return response.data
    })


export const cowinSlice = createSlice({
    name: 'cowin',
    initialState,
    reducers: {
        resetDistrictStore: (state) => {
            state.districts = [];
        },
        resetCalendarByDistrictStore: (state) => {
            state.calendarByDistrict = { centers: [] };
        },
        setSelectedState: (state, action) => {
            const { stateName } = action.payload;
            state.selected.stateEnt.stateName = stateName;
            if (action.payload.stateId) {
                state.selected.stateEnt.stateId = action.payload.stateId;
            }
            else {
                state.selected.stateEnt.stateId = null;
            }
        },
        setSelectedDistrict: (state, action) => {
            const { districtName } = action.payload;
            state.selected.districtEnt.districtName = districtName;
            if (action.payload.districtId) {
                state.selected.districtEnt.districtId = action.payload.districtId;
            }
            else {
                state.selected.districtEnt.districtId = null
            }
        },
        setFeeFilter: (state, action) => {
            const { feeType, typeSelected } = action.payload;
            state.filters.feeType[feeType] = typeSelected;
        },
        setKeywordFilter: (state, action) => {
            state.filters.keywords = action.payload;
        }
    },
    extraReducers: {
        [fetchCalendarByDistrict.pending]: (state) => {
            state.status.calendarByDistrict = 'loading';
        },
        [fetchCalendarByDistrict.fulfilled]: (state, action) => {
            state.status.calendarByDistrict = 'succeeded';
            state.calendarByDistrict = action.payload;
        },
        [fetchCalendarByDistrict.rejected]: (state, action) => {
            state.status.calendarByDistrict = 'failed';
            state.error.calendarByDistrict = action.error.message;
        },
        [fetchStates.pending]: (state) => {
            state.status.states = 'loading';
        },
        [fetchStates.fulfilled]: (state, action) => {
            state.status.states = 'succeeded';
            //Here we select the slates key from the response
            // Response: {
            //  states: []
            // }
            state.states = action.payload.states;
        },
        [fetchStates.rejected]: (state, action) => {
            state.status.states = 'failed';
            state.error.states = action.error.message;
        },
        [fetchDistricts.pending]: (state) => {
            state.status.districts = 'loading';
        },
        [fetchDistricts.fulfilled]: (state, action) => {
            state.status.districts = 'succeeded';
            state.districts = action.payload.districts;
        },
        [fetchDistricts.rejected]: (state, action) => {
            state.status.districts = 'failed';
            state.error.districts = action.error.message;
        },
        [fetchVaccinationReports.fulfilled]: (state, action) => {
            state.status.vaccinationReports = 'succeeded';
            state.error.vaccinationReports = null;
            state.vaccinationReports = action.payload;
        },
        [fetchVaccinationReports.rejected]: (state, action) => {
            state.status.vaccinationReports = 'failed';
            state.error.vaccinationReports = action.error.message;
        }
    },
});



export const { resetDistrictStore,
    resetCalendarByDistrictStore,
    setKeywordFilter,
    setFeeFilter,
    setSelectedState,
    setSelectedDistrict
} = cowinSlice.actions;

export const selectCalendarByDistrict = (state) => state.cowin.calendarByDistrict.centers;

export const selectKeywordFilter = (state) => state.cowin.filters.keywords;
export const selectFeeFilters = (state) => state.cowin.filters.feeType;

export const selectAllStates = (state) => state.cowin.states;
export const selectAllDistricts = (state) => state.cowin.districts;
export const selectSelectedState = (state) => state.cowin.selected.stateEnt;
export const selectSelectedDistrict = (state) => state.cowin.selected.districtEnt;

export const selectVaxReportsLastThirtyDays = (state) => state.cowin.vaccinationReports.last30DaysVaccination;

export const selectKeywordFilteredCalendarByDistrict = createSelector(
    selectCalendarByDistrict,
    selectKeywordFilter,
    (centers, keywords) => {
        if (keywords.length > 0) {
            return centers.filter((center) => {
                const target = [
                    center.center_id.toString(),
                    center.name,
                    center.address,
                    center.block_name
                ].join(' ').toLowerCase();
                return keywords.some(el => target.indexOf(el.toLowerCase()) >= 0)
            });
        }
        return centers;
    }
)

export const selectFilteredCalendarByDistrict = createSelector(
    selectKeywordFilteredCalendarByDistrict,
    selectFeeFilters,
    (centers, feeType) => {
        return centers.filter((center) => {
            return feeType[center.fee_type]
        });
    }
)

export default cowinSlice.reducer;
