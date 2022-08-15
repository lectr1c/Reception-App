import styles from '../../styles/Main.module.css'
import BarGraph from './Graph/PieGraph';
import {useListState} from "@mantine/hooks";
import {Team} from "../../types";
import {useEffect, useState} from "react";
import axios from "axios";

const Hero = () => {

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

    return (
        <div className={styles.heroContainer}>
            {/*<div className={styles.heroMessageCon}>*/}
            {/*    <p>Laget <b>{winningTeam?.name}</b> leder med <b>{winningTeam?.points}</b> poäng!</p>*/}
            {/*</div>*/}
            <div className={styles.graphContainer}>
                <BarGraph teams={teams}/>
            </div>
        </div>
    )
}

export default Hero;