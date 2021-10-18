import React, { Component } from 'react'; /* importing Component package too */
import { Bar } from 'react-chartjs-2';

class Ward extends Component {

    constructor(props) {
        // to set state, call super func and pass in props
        super(props);
        this.state = {
            chartData: {
                labels: ['A', 'C', 'D', 'E', 'F(N)', 'F(S)', 'G(N)', 'G(S)', 'H(E)', 'H(W)', 'K(E)', 'K(W)', 'L', 'M(E)', 'M(W)', 'N', 'P(N)', 'P(S)', 'R(C)', 'R(N)', 'R(S)', 'S', 'T'],
                datasets: [
                    {
                        label: "Number of Centers",
                        data: [
                            1, 9, 2, 11, 13, 6, 7, 5, 7, 7, 6, 12, 21, 6, 6, 9, 9, 15, 13, 3, 10, 9, 7
                        ],
                        backgroundColor: [
                            // '#61effb',
                            '#6690d5'
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
                        //  subtitle: {
                        //     display: true,
                        //     text: 'F(N) means Ward F-North',
                        //     color: 'blue',
                        //     position:"bottom",
                        //     font: {
                        //       size: 12,
                        //       family: 'tahoma',
                        //       weight: 'normal',
                        //       style: 'italic'
                        //     },
                        //     padding: {
                        //       bottom: 10
                        //     }
                        //   }
                     },
                    }
                }
                />
                
            </div>
        )
    }
}

export default Ward;
