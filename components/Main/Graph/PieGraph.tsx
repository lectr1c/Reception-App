import React, {useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import type { ChartData, ChartOptions } from 'chart.js';
import axios from "axios";
import {useListState} from "@mantine/hooks";
import {Team} from "../../../types";

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export const options : ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: "#14213D",
                font: {
                    family: 'Silkscreen',
                    size: 15
                }
            }
        },
        title: {
            display: true,
            text: 'Totala Grupp Poäng',
            position: 'top',
            font: {
                family: 'Silkscreen',
                size: 20,
            },
            color: '#fca311'
        }
    }
}

const PieGraph = () => {

    const  [teams, setTeams] = useListState<Team>();

    useEffect(() => {
        axios.get("https://reception-app.vercel.app/api/team")
            .then(r => {
                console.log(r);
                setTeams.setState([...r.data]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const data : ChartData<'pie'> = {
        labels: teams.map((team: Team) => {
            return team.name ? team.name : ""
        }),
        datasets: [
            {
                label: '# Points',
                data: teams.map((team : Team) => {
                    return team.points ? team.points : 0
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
                ],
                borderWidth: 5,
            },
        ],
    };

    return <Pie data={data} options={options}/>;
}

export default PieGraph;
