import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
        </Head>
        <div className={styles.container}>
            <Navbar />
            <b>Config: </b> {JSON.stringify(config)}
            <ul>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig