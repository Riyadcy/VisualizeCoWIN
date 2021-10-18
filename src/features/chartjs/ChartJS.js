import React, { Component } from 'react'; /* importing Component package too */
import Chart from './Pie'
import Ward from './Ward'
import Rate from './Rate'
import '../visualizations/Visualizations.css'
import { H3, H5 } from "@blueprintjs/core";


export function Charts() {
    return (
        <div className="visualizations-container">
            <div className="visualization-hero">
                <div className="hero-content">
                    <span className="hero-header">Mumbai Vaccination Facts</span>
                </div>
            </div>
            <div className="charts">
                <div className="chart pie-chart-1">
                    <H3 >Free vs Paid Vaccination Centers</H3>
                    <Chart />
                </div>
                <div className="chart pie-chart-1">
                    <H3 >Number of Vaccination Centers in each Ward</H3>
                    <Ward />
                    <p > A = Ward A, C = Ward C, F(N) = Ward F-North, K(E) = Ward K-East. M(W) = Ward M-West, P(S) = Ward P-South, R(C) = Ward R-Center, etc </p>
                </div>
                <div className="chart pie-chart-1">
                    <H3 >Vaccine Price Comparison </H3>
                    <Rate />
                    <p >Rate1, Rate2, Rate3, etc are the different rates. </p>
                </div>
                <div className=" disclaimer">
                    <p>⚠ These Mumbai Vaccination Facts are as of 17th October 2021. </p>
                </div>

            </div>
        </div>
    )
}