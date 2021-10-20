import React, { Component } from 'react'; /* importing Component package too */
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        // to set state, call super func and pass in props
        super(props);
        this.state = {
            chartData: {
                labels: ['Free', 'Paid'],
                datasets: [
                    {
                        label: "Doses",
                        data: [
                            // 98, 305
                            107, 384
                        ],
                        backgroundColor: [
                            'RGB(100, 194, 167)',
                            'RGB(45, 135, 187)'
                        ],
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="only-chart">
                
                <Doughnut
                    data={this.state.chartData}
                    width={500}
                    height={400}
                    options={{ maintainAspectRatio: false },
                    {
                        plugins: {
                          legend: {
                            position: 'bottom',
                         },
                     },
                    }
                }
                />
                
            </div>
        )
    }
}

export default Chart;
