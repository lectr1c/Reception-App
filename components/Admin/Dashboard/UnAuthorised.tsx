import {Button, Text} from "@mantine/core";
import styles from "/styles/Admin.module.css";
import {signIn} from "next-auth/react";


const UnAuthorised = () => {

    return (
        <div className={styles.UnAuthCon}>
            <Text component={"h1"}>Du behöver logga in med ditt ISF gmail konto! </Text>
            <Button color={'green'} size={"lg"} onClick={() => signIn('google')}>Logga in</Button>
        </div>
    )
}
export default UnAuthorised;