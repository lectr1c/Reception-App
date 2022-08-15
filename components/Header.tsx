import styles from '../styles/Header.module.css';
import { Button } from '@mantine/core';
import Link from 'next/link'


const Header = () => {

    return (
        <Link href="/">
            <div className={styles.container}>
                <h1>MOTTAGNING 2022 POÄNGJAKT</h1>
            </div>
        </Link>

    )
}

export default Header;

//https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff