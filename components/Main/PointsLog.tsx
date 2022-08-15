import { TPointsLog } from "../../types";
import { Table } from '@mantine/core';
import LogRow from './PointsLog/LogRow';
import styles from '../../styles/Main.module.css';
import {useListState} from "@mantine/hooks";
import logRow from "./PointsLog/LogRow";
import {useEffect} from "react";
import axios from 'axios';

const PointsLog = () => {

    const [LogRows, setLogRows] = useListState<TPointsLog>();

    useEffect(() => {
        axios.get("https://reception-app.vercel.app/api/pointslog")
            .then(r => {
                setLogRows.setState([...r.data]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    console.log(LogRows);


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
                        key={row._id}/>)
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default PointsLog;