import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(`${config.URL}/login`,{ username, password, remember },{ withCredentials: true });
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } 
    catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const reMem = async () => {
    setRemember(!remember);
  };
  
  const loginForm = () => (
    <center><div className={styles.gridContainer}>
      <div><b>Username:</b></div><br></br>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div><br></br>
      <div><b>Password:</b></div><br></br>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div><br></br>
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          onClick={reMem}
        /></div>
      <div className={styles.text}><label><ins><b>Remember Me</b></ins></label></div>
    </div></center>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <center><h1>Login</h1></center>
        <br />
        <center><b><div>Status: {status}</div></b></center>
        <br /><br />
        <center>{loginForm()}
        <div>
          <button className={styles.btn2} 
          onClick={login}>Login</button>
        </div></center>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
