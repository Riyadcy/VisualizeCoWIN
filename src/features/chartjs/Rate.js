import React, { Component } from 'react'; /* importing Component package too */
import { Bar } from 'react-chartjs-2';

class Rate extends Component {

    constructor(props) {
        // to set state, call super func and pass in props
        super(props);
        this.state = {
            chartData: {
                labels: ['Rate1', 'Rate2', 'Rate3', 'Rate4', 'Rate5', 'Rate6', 'Rate7', 'Rate8',],
                datasets: [
                    {
                        label: "Covishield",
                        data: [0,
                            250,
                            500,
                            630,
                            700,
                            730,
                            750,
                            780
                        ],
                        backgroundColor: [
                            '#2d87bb',
                        ],
                    },
                    {
                        label: "Covaxin",
                        data: [
                            0,
                            1200,
                            1250,
                            1260,
                            1300,
                            1410,
                        ],
                        backgroundColor: [
                            '#64c2a7',
                        ],
                    },
                    {
                        label: "Sputnik",
                        data: [
                            1000,
                            1145,
                        ],
                        backgroundColor: [
                            '#949a9e',

                        ],
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="only-chart">
                <Bar
                    data={this.state.chartData}
                    width={1000}
                    height={500}
                    options={{ maintainAspectRatio: false },
                    {
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                        },
                    }}
                />

            </div>
        )
    }
}

export default Rate;
