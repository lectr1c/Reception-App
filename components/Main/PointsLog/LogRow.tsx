import styles from '../../../styles/Main.module.css';
import { TPointsLog } from "../../../types";
import ReactTimeAgo from 'react-time-ago';


const LogRow = (props: TPointsLog) => {

    return (
        <tr className={styles.logRow && styles.tableFont}>
            <td><ReactTimeAgo date={props.registeredAt ? props.registeredAt : new Date()} locale={'se'}/></td>
            <td>{props.teamName}</td>
            <td>{props.reason}</td>
            <td>{props.points}</td>
        </tr>
    )
}

export default LogRow