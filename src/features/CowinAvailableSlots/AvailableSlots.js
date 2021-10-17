import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCalendarByDistrict,
    selectFilteredCalendarByDistrict,
    selectKeywordFilter, selectSelectedDistrict, selectSelectedState,
    setKeywordFilter
} from "../Cowin/cowinSlice";
import "./AvailableSlots.css";
import { CenterCard } from "./Center";
import { DistrictSelector, StateSelector } from "./Selectors";
import { Button, Intent, NonIdealState, Spinner, TagInput} from "@blueprintjs/core";
import { FeeTypeFilters } from "./Filters";
import {formatDate} from "../../utils/DateUtilities";

/*
* A component which shows the Available Slots (active slots returned by CoWIN API)
* after the user selects a State and District.
* It also allows filtering by attributes: keywords (center name, center address
* and center block), fee type (Free/Paid).
* */
export function AvailableSlots() {
    const dispatch = useDispatch();
    const calendarFetchStatus = useSelector((state) => state.cowin.status.calendarByDistrict);
    // Use the filtered calendarByDistrict data from the store
    const centers = useSelector(selectFilteredCalendarByDistrict);
    const selectedState = useSelector(selectSelectedState);
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const searchInputValues = useSelector(selectKeywordFilter);

    /*
    * Decide what {content} to load in the "centers" div.
    * Depending on the fetch status and filters, show nice contextual messages for each case.
    * */
    let content;
    if (calendarFetchStatus === "idle" || selectedDistrict.district_name === "Select a district") {
        content = <NonIdealState
            icon={"info-sign"}
            title={"Select State and District"}
            description={"You will be able to refresh data for a single center without reloading the page."}
        />
    }
    else if (calendarFetchStatus === "loading") {
        content = <Spinner className={"centers-loading-spinner"} intent={Intent.PRIMARY} size={50} />
    }
    else if (calendarFetchStatus === "succeeded" && centers.length === 0) {
        content = <NonIdealState
            icon={"issue"}
            title={"Currently, no slots are available."}
            description={"Please check again after sometime."}
        />
    }
    else if (calendarFetchStatus === "succeeded") {
        if (centers.length > 0) {
            content = centers.map((center, id) => (
                <CenterCard key={id} center={center} />
            ));
        }
        else {
            content = <NonIdealState
                icon={"zoom-out"}
                title={"No centers match your query."}
                description={"It might be helpful to divide search into multiple keywords."}
            />
        }
    } else if (calendarFetchStatus === "failed") {
        content = <NonIdealState
            icon={"error"}
            title={"There was a problem!"}
            description={"Couldn't load data."}
        />
    }

    // Clear Button element to clear/reset the Search bar
    const clearButton = (
        <Button
            icon={"cross"}
            minimal={true}
            onClick={() => dispatch(setKeywordFilter([]))}
        />
    );

    // Refresh button to refresh the data, doesn't reset filters
    const refreshData = () => {
        if (selectedDistrict.districtName === "Select a District" || selectedState.stateName === "Select a State") {
            return
        }
        let date = new Date();
        date = formatDate(date, '-');
        dispatch(fetchCalendarByDistrict({districtId: selectedDistrict.districtId, date: date}));
    }

    return (
        <div className="slot-checker-container  bp4-card">
            <div className="slot-checker">
                <div className="header">
                    Available Slots
                </div>
                <div className="slot-toolbar-container">
                    <div className="slot-toolbar">
                        <StateSelector />
                        <DistrictSelector />
                        <TagInput
                            className="slot-toolbar-item search"
                            leftIcon={"search"}
                            placeholder={"Search with multiple keywords.."}
                            onChange={(values => dispatch(setKeywordFilter(values)))}
                            values={searchInputValues}
                            rightElement={clearButton}
                        />
                        <div className="slot-toolbar-item fee-types-container">
                            <FeeTypeFilters />
                        </div>
                        <div className="slot-toolbar-item">
                            <Button icon={"refresh"} text={"Refresh"} onClick={refreshData}/>
                        </div>
                        <div className="slot-toolbar-item">
                            <Button icon={"settings"} text={"Settings"} />
                        </div>
                    </div>
                </div>
                <div className="centers">
                    {content}
                </div>
            </div>
        </div>
    )
}