import styles from '../../styles/Main.module.css'
import LineGraph from './Graph/PieGraph';

const Hero = () => {

    return (
        <div className={styles.heroContainer}>
            <div>
                hi
            </div>
            <div className={styles.graphContainer}>
                <LineGraph/>
            </div>
        </div>
    )
}

export default Hero;