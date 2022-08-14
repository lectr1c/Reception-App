import { useSession } from "next-auth/react";
import styles from '../styles/Admin.module.css';
import {TextInput, Button, Select, NumberInput} from '@mantine/core'

const DashboardPage = () => {


    return (
        <div className={styles.dashboardContainer}>
            <div>
                <TextInput label={"Grupp Namn"} variant={"default"}/>
                <Button>Lägg till</Button>
            </div>
            <div>
                <Select data={["Hi"]} label={"Grupp"} variant={"default"}/>
                <NumberInput label={"Poäng"} className={styles.numInput}/>
                <Button>Lägg till poäng</Button>
            </div>
        </div>
    )
}

export default DashboardPage;