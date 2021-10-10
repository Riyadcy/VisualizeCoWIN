import React, {useEffect, useState} from "react";
import "./Visualizations.css";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCaseCounts,
    fetchVaxLiveCount,
    fetchVaxStats,
    selectCaseCounts,
    selectVaxLiveCount,
    selectVaxStats
} from "../mygov/myGovSlice";
import {H1, H2, H3, H4, H5, Intent, Tag} from "@blueprintjs/core";
import FlipNumbers from 'react-flip-numbers';

export function Visualizations() {
    const dispatch = useDispatch();
    const vaxLiveCount = useSelector(selectVaxLiveCount);
    const vaxLiveCountFetchStatus = useSelector((state) => state.myGov.status.VAX_LIVE_COUNT);
    const [beginCounter, setBeginCounter] = useState(false);
    const vaxStats = useSelector(selectVaxStats);
    const vaxStatsFetchStatus = useSelector((state) => state.myGov.status.VAX_STATS);
    const caseCounts = useSelector(selectCaseCounts);
    const caseCountsFetchStatus = useSelector((state) => state.myGov.status.CASE_COUNTS);

    useEffect(() => {
        if (vaxLiveCountFetchStatus === "idle") {
            dispatch(fetchVaxLiveCount());
        }
        if (vaxLiveCountFetchStatus === "succeeded") {
            setBeginCounter(true);
        }
    }, [vaxLiveCountFetchStatus, dispatch])

    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(fetchVaxLiveCount()),
            5000
        );
        return () => clearTimeout(timer);
    })

    useEffect(() => {
        if (vaxStatsFetchStatus === "idle") {
            let ts = Math.round((new Date()).getTime() / 1000);
            dispatch(fetchVaxStats({timestamp: ts}));
        }
    }, [vaxStatsFetchStatus, dispatch])

    let vaccinationStatsEl;
    if (vaxStatsFetchStatus === "succeeded") {
        vaccinationStatsEl =
            <div className="bp4-card bp4-elevation-2 visualization-card">
                <H3>Total Vaccinations</H3>
                <H2 className="total-vax-count">{vaxStats.india_total_doses.toLocaleString('en-IN')}</H2>
                <H5>Dose 1: {vaxStats.india_dose1.toLocaleString('en-IN')}</H5>
                <H5>Dose 2: {vaxStats.india_dose2.toLocaleString('en-IN')}</H5>
                <i>As on {vaxStats.day}</i>
            </div>
    }
    else {
        vaccinationStatsEl =
            <div className="bp4-card bp4-elevation-2 visualization-card bp4-skeleton">
                <H4>Total Vaccinations as of 0000-00-00</H4>
                <H2 className="total-vax-count">0</H2>
                <H5>Dose 1: 0</H5>
                <H5>Dose 2: 0</H5>
            </div>
    }

    useEffect(() => {
        if (caseCountsFetchStatus === "idle") {
            let ts = Math.round((new Date()).getTime() / 1000);
            dispatch(fetchCaseCounts({timestamp: ts}));
        }
    }, [caseCountsFetchStatus, dispatch])

    const getProps = (item) => {
        if (item < 0) {
            return {
                icon: "arrow-down",
                intent: Intent.SUCCESS
            }
        }
        else {
            return {
                icon: "arrow-up",
                intent: Intent.WARNING
            }
        }
    }

    let caseCountEl, totalCaseCountEl;
    if (caseCountsFetchStatus === "succeeded") {
        caseCountEl =
            <div className="bp4-card bp4-elevation-2 visualization-card">
                <H2>Active Cases</H2>
                <H1 style={{color: "#D33136"}}>{caseCounts.active.toLocaleString('en-IN')}</H1>
                <Tag {...getProps(caseCounts.diff_active)} large={true}>
                    {caseCounts.diff_active.toLocaleString('en-IN')}
                </Tag>
                <br/>
                <i>As on {caseCounts.time}</i>
            </div>;
        totalCaseCountEl =
            <div className="bp4-card bp4-elevation-2 visualization-card">
                <H2>Total Cases</H2>
                <H1 style={{color: "#D33136"}}>{caseCounts.confirmed.toLocaleString('en-IN')}</H1>
                <Tag {...getProps(caseCounts.diff_confirmed)} large={true}>
                    {caseCounts.diff_confirmed.toLocaleString('en-IN')}
                </Tag>
                <br/>
                <i>As on {caseCounts.time}</i>
            </div>;
    }
    else {
        caseCountEl =
            <div className="bp4-card bp4-elevation-2 visualization-card bp4-skeleton">
                <H2>Active Cases</H2>
                <H1 style={{color: "#D33136"}}>0</H1>
                <Tag icon={"arrow-up"}>Hello</Tag>
                <i>As on Now</i>
            </div>;
        totalCaseCountEl =
            <div className="bp4-card bp4-elevation-2 visualization-card bp4-skeleton">
                <H2>Total Cases</H2>
                <H1 style={{color: "#D33136"}}>0</H1>
                <Tag icon={"arrow-up"}>Hello</Tag>
            </div>;
    }

    return (
        <div className="visualizations-container bp4-card">
            <div className="visualization-hero">
                <div className="hero-content">
                    <span className="hero-header">Live Vaccination Count</span>
                    <div className="vaccine-counter-container">
                        <div className="vaccine-counter">
                            <FlipNumbers
                                height={50}
                                width={50}
                                play={beginCounter}
                                // perspective={100}
                                numbers={vaxLiveCount.toString()}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="visualization-cards">
                {vaccinationStatsEl}
                {caseCountEl}
                {totalCaseCountEl}
            </div>
        </div>
    )
}