import React, {useEffect} from "react";
import "./Visualizations.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchVaxLiveCount, selectVaxLiveCount} from "../mygov/myGovSlice";
import {H3, H4} from "@blueprintjs/core";

export function Visualizations() {
    const dispatch = useDispatch();
    const vaxLiveCount = useSelector(selectVaxLiveCount);
    const vaxLiveCountFetchStatus = useSelector((state) => state.myGov.status.VAX_LIVE_COUNT);

    useEffect(() => {
        if (vaxLiveCountFetchStatus === "idle") {
            dispatch(fetchVaxLiveCount());
        }
        if (vaxLiveCountFetchStatus === "succeeded") {
            console.log(vaxLiveCount)
        }
    }, [vaxLiveCountFetchStatus, dispatch])

    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(fetchVaxLiveCount()),
            10000
        );
        return () => clearTimeout(timer);
    })

    return (
        <div className="visualizations-container">
            <div className="visualization-cards">
                <div className="bp4-card visualization-card">
                    <H3>Live Vaccination Count</H3>
                    <H4>{vaxLiveCount}</H4>
                </div>
            </div>
        </div>
    )
}