import './App.css';
import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['Date 1', 'Date 2', 'Date 3', 'Date 4', 'Date 5', 'Date 6'],
    datasets: [
        {
            label: 'Dose 1',
            data: [100, 200, 100, 150, 200, 250],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: 'Dose 2',
            data: [80, 60, 200, 55, 200, 80],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
        },
    ],
};

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

const LineChart = () => (
    <>
        <div className='header'>
            <h1 className='title'>Test Chart</h1>
        </div>
        <Line data={data} options={options} />
    </>
);

function App() {
    return (
        <div className="App">
            <div className="chart-container">
                <div className="chart">
                    <LineChart />
                </div>
            </div>
        </div>
    );
}

export default App;

/*
* *
*
.App {
  text-align: center;
}

.chart-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}


.chart {
  width: 600px;
  height: 400px;
}
* */