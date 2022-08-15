import { useSession } from "next-auth/react";
import styles from '../styles/Admin.module.css';
import {TextInput, Button, Select, NumberInput} from '@mantine/core'
import {useEffect, useState} from "react";
import axios from "axios";
import {useListState} from "@mantine/hooks";
import {Team} from "../types";


const DashboardPage = () => {

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

    const [teamName, setTeamName] = useState("");

    const addTeam = () => {
        axios.post("https://reception-app.vercel.app/api/team", {name: teamName})
            .then(r => {
                console.log("Yooo" + r);
                setTeams.setState([...r.data]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const [selectedTeam, setSelectedTeam] = useState<string | null>();
    const [points, setPoints] = useState(1);
    const [reason, setReason] = useState("");

    const addPoints = () => {
        axios.put("https://reception-app.vercel.app/api/team", {teamName: selectedTeam, pointsToAdd: points, reason: reason})
            .then(r => {
                console.log("hiii  " + r);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={styles.dashboardContainer}>
            <div>
                <TextInput label={"Grupp Namn"} variant={"default"} value={teamName} onChange={(event) => setTeamName(event.currentTarget.value)}/>
                <Button onClick={() => addTeam()}>Lägg till</Button>
            </div>
            <div>
                <Select data={teams.map((team: Team) => team.name ? team.name : "ss")} label={"Grupp"} variant={"default"} onChange={setSelectedTeam}/>
                <NumberInput label={"Poäng"} className={styles.numInput} value={points} onChange={(val) => setPoints(val ? val : 1)}/>
                <TextInput label={"Händelse"} value={reason} onChange={(event) => setReason(event.currentTarget.value)}/>
                <Button onClick={() => addPoints()}>Lägg till poäng</Button>
            </div>
        </div>
    )
}

export default DashboardPage;