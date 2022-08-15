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
                const index =teams.findIndex((teamX) => {
                    teamX.points === Math.max(...teams.map(team => team.points ? team.points : 0))
                })

                setWinningTeam(index)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const [winningTeam, setWinningTeam] = useState(0)

    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroMessageCon}>
                <p>Laget <b>{teams.at(winningTeam)?.name}</b> leder med <b>{teams.at(winningTeam)?.points}</b> poäng!</p>
            </div>
            <div className={styles.graphContainer}>
                <BarGraph teams={teams}/>
            </div>
        </div>
    )
}

export default Hero;