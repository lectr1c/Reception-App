import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Main from '../components/Main';
import sv from 'javascript-time-ago/locale/sv.json';
import TimeAgo from 'javascript-time-ago';

TimeAgo.addLocale(sv);
TimeAgo.addDefaultLocale(sv);

const Home: NextPage = () => {
  return (
    <div>
        <Header/>
        <Main/>
    </div>
  )
}

export default Home
