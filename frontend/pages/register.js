import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/register.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <center><div className={styles.gridContainer}>
            <div>
                <b>Username:</b></div><br></br>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div><br></br>
            <div>
                <b>Email:</b></div><br></br>
            <div>
                <input type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div><br></br>
            <div>
                <b>Password:</b></div><br></br>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div></center>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <center><h1>Register</h1></center>
                
                </div>
                <br />
                <center>
                <b>Status: </b> <i>{status}</i>
                </center>
                <br /><br />
                <div className={styles.content}>
                    {registerForm()}
                </div><br/>
                <div>
                    <center><button className={styles.btn}
                    onClick={register}>Register</button>
                    </center></div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
