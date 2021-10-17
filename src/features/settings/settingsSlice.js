import {createSlice} from "@reduxjs/toolkit";


const settingsMap = {
    calendarByDistrictView: "SETTINGS_CALENDARBYDIST_VIEW",
    calendarByDistrictAutoRefresh: "SETTINGS_CALENDARBYDIST_AR",
    calendarByDistrictAutoRefreshInterval: "SETTINGS_CALENDARBYDIST_AR_INT"
}

const defaultSettings = {
    calendarByDistrictView: "table",
    calendarByDistrictAutoRefresh: false,
    calendarByDistrictAutoRefreshInterval: null

}

const initialState = {
    calendarByDistrictView: localStorage.getItem(settingsMap.calendarByDistrictView) || defaultSettings.calendarByDistrictView,
    calendarByDistrictAutoRefresh: localStorage.getItem(settingsMap.calendarByDistrictAutoRefresh) === "true"
        || defaultSettings.calendarByDistrictAutoRefresh,
    calendarByDistrictAutoRefreshInterval: parseInt(localStorage.getItem(settingsMap.calendarByDistrictAutoRefreshInterval))
        || defaultSettings.calendarByDistrictAutoRefreshInterval
}


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetSettings: (state, action) => {
            localStorage.setItem('SETTINGS', 'true');
            localStorage.setItem(settingsMap.calendarByDistrictView, defaultSettings.calendarByDistrictView);
            localStorage.setItem(settingsMap.calendarByDistrictAutoRefresh,
                defaultSettings.calendarByDistrictAutoRefresh);
            localStorage.setItem(settingsMap.calendarByDistrictAutoRefreshInterval,
                defaultSettings.calendarByDistrictAutoRefreshInterval)
            state.calendarByDistrictView = defaultSettings.calendarByDistrictView;
            state.calendarByDistrictAutoRefresh = defaultSettings.calendarByDistrictAutoRefresh;
            state.calendarByDistrictAutoRefreshInterval = defaultSettings.calendarByDistrictAutoRefreshInterval;
        },
        setCalendarByDistrictView: (state, action) => {
            const { viewName } = action.payload;
            state.calendarByDistrictView = viewName;
            localStorage.setItem(settingsMap.calendarByDistrictView, viewName);
        },
        setCalendarByDistrictAutoRefreshInterval: (state, action) => {
            const { interval } = action.payload;
            if (interval === null) {
                state.calendarByDistrictAutoRefresh = false;
                state.calendarByDistrictAutoRefreshInterval = null;
                localStorage.setItem('SETTINGS_CALENDARBYDIST_AR', 'false')
                localStorage.removeItem('SETTINGS_CALENDARBYDIST_AR_INT')
            }
            else {
                state.calendarByDistrictAutoRefresh = true;
                state.calendarByDistrictAutoRefreshInterval = interval;
                localStorage.setItem('SETTINGS_CALENDARBYDIST_AR', 'true')
                localStorage.setItem('SETTINGS_CALENDARBYDIST_AR_INT', interval.toString())
            }
        }
    }
});

export const {
    resetSettings,
    setCalendarByDistrictView,
    setCalendarByDistrictAutoRefreshInterval
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
