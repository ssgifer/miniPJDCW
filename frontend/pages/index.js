import Head from 'next/head' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css' 
import React from 'react';

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}

export default function Home({ token }) {
    
  return (
   <div>
    <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    </Head>
    <Navbar />
    
    <div className={styles.container}>
    <div className={styles.title}>
    <marquee bgcolor="#FFCCCC" direction="up" scrollamount="5" width="120%" height="120px">
    <center><h2>Welcome to Puppy Shop</h2>
            <h2>Try to choose that you like.</h2>
    </center></marquee></div><br/><br/>

      <div className={styles.container1}>
      <div className={styles.title}>
      <marquee bgcolor="#FFCCCC" direction="left" scrollamount="15" width="100%" height="200px">
          <h1><ins>**Promotion**</ins></h1>
          <h3>ซื้อสุนัขวันนี้ แถมฟรีเซตแฟนวีสุดน่ารัก ทั้งเสื้อผ้า เบาะนอน และของเล่นมากมาย</h3>
          <h2>เฉพาะ 3 วันนี้เท่านั้น!!!</h2>
          </marquee></div>  
        </div><br/><br/>  
        <h1>##สินค้าแนะนำ##</h1> 
        <div className={styles.image}></div>
            <image src = "1(1)"></image>
      </div>
      </div> 
  )
}