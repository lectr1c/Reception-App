import { TPointsLog } from "../../types";
import { Table } from '@mantine/core';
import LogRow from './PointsLog/LogRow';
import styles from '../../styles/Main.module.css';
import {useListState} from "@mantine/hooks";
import logRow from "./PointsLog/LogRow";
import {useEffect} from "react";

const data: TPointsLog[] = [
    {
        id: 1,
        teamName: "URanus",
        points: 10,
        reason: "Upphittad kod",
        registeredAt: new Date(0)
    },
    {
        id: 2,
        teamName: "Jupyterrr",
        points: 15,
        reason: "FLOTTRACE",
        registeredAt: new Date()
    }
]

const PointsLog = () => {

    const [LogRows, setLogRows] = useListState<TPointsLog>();

    useEffect(() => {
        setLogRows.setState(data);
    }, [])

    return (
        <div className={styles.tableContainer}>
            <Table highlightOnHover className={styles.table}>
                <thead>
                <tr>
                    <th>Registrerad</th>
                    <th>Grupp namn</th>
                    <th>Händelse</th>
                    <th>Poäng</th>
                </tr>
                </thead>
                <tbody>
                {LogRows.map((row) => {
                    return (<LogRow
                        points={row.points}
                        reason={row.reason}
                        registeredAt={row.registeredAt}
                        teamName={row.teamName}
                        key={row.id}/>)
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default PointsLog;