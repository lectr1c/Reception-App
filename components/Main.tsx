import styles from '../styles/Main.module.css';
import PointsLog from './Main/PointsLog';
import Hero from './Main/Hero';

const Main = () => {

    return (
        <div className={styles.container}>
            <Hero/>
            <PointsLog/>
        </div>
    )
}

export default Main;