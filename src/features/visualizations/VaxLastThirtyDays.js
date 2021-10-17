import React, {useEffect} from "react";
import {formatDate} from "../../utils/DateUtilities";
import {fetchVaccinationReports, selectVaxReportsLastThirtyDays} from "../Cowin/cowinSlice";
import {useDispatch, useSelector} from "react-redux";
import {Line} from "react-chartjs-2";
import {H3} from "@blueprintjs/core";

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export function VaxLastThirtyDays() {
    const dispatch = useDispatch();
    const vaxLastThirtyDaysReport = useSelector(selectVaxReportsLastThirtyDays);
    const vaccinationReportsFetchStatus = useSelector((state) => state.cowin.status.vaccinationReports);

    useEffect(() => {
        let date = new Date()
        date = formatDate(date, '-', 2);
        if (vaccinationReportsFetchStatus === "idle") {
            dispatch(fetchVaccinationReports({date: date, districtId: '', stateId: ''}));
        }
    }, [vaccinationReportsFetchStatus, dispatch]);

    let chartEl;
    if (vaccinationReportsFetchStatus === "succeeded") {
        let labelVals = vaxLastThirtyDaysReport.map(report => report.vaccine_date);
        let doseOne = vaxLastThirtyDaysReport.map(report => report.dose_1);
        let doseTwo = vaxLastThirtyDaysReport.map(report => report.dose_2);
        const data = {
            labels: labelVals,
            datasets: [
                {
                    label: 'Dose 1',
                    data: doseOne,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Dose 2',
                    data: doseTwo,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                },
            ],
        };
        chartEl = <Line data={data} options={options} />
    }
    else {
        chartEl = <div>Loading...</div>
    }

    return (
        <div className="chart-1">
            <H3>Vaccination Count by Doses (Last 30 Days)</H3>
            {chartEl}
        </div>
    )
}