import React from "react";
import {Pie} from "react-chartjs-2";
import {selectPublicReports} from "../Cowin/cowinSlice";
import {useSelector} from "react-redux";
import {H3} from "@blueprintjs/core";

const options = {
    responsive: true,
    maintainAspectRatio: true
}

function VaccineDistribution() {
    // const dispatch = useDispatch();
    const publicReportsFetchStatus = useSelector(state => state.cowin.status.publicReports);
    const publicReports = useSelector(selectPublicReports);

    // useEffect(() => {
    //     let date = new Date()
    //     date = formatDate(date, '-', 2);
    //     if (publicReportsFetchStatus === "idle") {
    //         dispatch(fetchPublicReports({
    //             date: date,
    //             districtId: '',
    //             stateId: ''
    //         }));
    //     }
    // }, [dispatch, publicReportsFetchStatus]);

    let chartEl1;
    let chartEl2;
    if (publicReportsFetchStatus === "succeeded") {
        let vaccineDistribution = publicReports.topBlock.vaccination;
        const vaccineDistributionData = {
            labels: ["Covishield", "Covaxin", "Sputnik V"],
            datasets: [
                {
                    label: 'Vaccine',
                    data: [vaccineDistribution.covishield, vaccineDistribution.covaxin, vaccineDistribution.sputnik],
                    backgroundColor: ["#2684a6", "#a64626", "#399e54"],
                },
            ],
        };
        chartEl1 = <Pie options={options} data={vaccineDistributionData} />

        const genderDistributionData = {
            labels: ["Male", "Female", "Others"],
            datasets: [
                {
                    label: 'Age',
                    data: [vaccineDistribution.male, vaccineDistribution.female, vaccineDistribution.others],
                    backgroundColor: ["#2d87bb", "#aadea7", "#399e54"]
                }
            ]
        }
        chartEl2 = <Pie options={options} data={genderDistributionData} />
    }
    else {
        chartEl1 = <div>Loading...</div>
        chartEl2 = <div>Loading...</div>
    }

    return (
        <div className="chart-horizontal-group">
            <div id="chart-group-1">
                <div className="chart-2">
                    <H3>Vaccine Distribution</H3>
                    {chartEl1}
                </div>
                <div className="chart-2">
                    <H3>Gender Distribution</H3>
                    {chartEl2}
                </div>
            </div>
        </div>
    )
}

let VaccineDistributionPieChart = React.memo(VaccineDistribution);

export { VaccineDistributionPieChart };