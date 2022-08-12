import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import type { ChartData, ChartOptions } from 'chart.js';

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const data : ChartData<'pie'> = {
    labels: ['Jupiter', 'Uranus', 'Astronauts', 'Stars', 'Aliens', 'Mars'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 3,
        },
    ],
};

export const options : ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Totala Grupp Poäng',
            position: 'top',
            font: {
                family: 'Silkscreen',
                size: 20,
            },
            color: "#fca311"
        }
    }
}

const PieGraph = () => {
    return <Pie data={data} options={options}/>;
}

export default PieGraph;
