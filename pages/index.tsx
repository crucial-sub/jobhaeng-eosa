import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../layout/Header';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <section></section>
            <style jsx>
                {`
                    div {
                        width: 100vw;
                        height: 100vh;
                    }
                `}
            </style>
        </div>
    );
};

export default Home;
