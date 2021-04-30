import Head from 'next/head' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css' 
import React from 'react';
import html from 'react'

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}

export default function Home({ token }) {
    
  return (
   <div>
    <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    </Head>
    <Navbar />
    <br/><br/>
    <div className={styles.container}>
    <div className={styles.title}>
    <center><marquee bgcolor="#FFCCCC" direction="left" scrollamount="5" width="100%" height="150px">
    <h2>Welcome to Puppy Shop</h2>
    <h2>Try to choose that you like.</h2>
    </marquee></center></div>

      <div className={styles.container1}>
      <div className={styles.title}>
      <marquee bgcolor="#FFCCCC" direction="left" scrollamount="15" width="100%" height="200px">
          <h1><ins>**Promotion**</ins></h1>
          <h3>ซื้อสุนัขวันนี้ แถมฟรีเซ็ตแฟนซีสุดน่ารัก ทั้งเสื้อผ้า เบาะนอน และของเล่นมากมาย</h3>
          <h2>เฉพาะ 3 วันนี้เท่านั้น!!!</h2>
          </marquee></div><br></br>
          <center><h1>## ลูกสุนัขมาใหม่ ##</h1></center>
          
          <center><table border="1" bordercolor="black" cellspacing="5" cellpadding="15">
          <tr>
            <td>  
              <center>
                <img src="https://1.bp.blogspot.com/-RRpCldhjjq8/Xap50QzDq8I/AAAAAAAAHpk/wwgoyVGRDWo5t1XRZYKpm0qqbwSA4DIQwCLcBGAsYHQ/s1600/1571453227801.jpg" width = '350' height = '300' />  
              </center><br/><br/>
            
              <center>
                <img src="https://cdn.thinglink.me/api/image/393896427756978177/1240/10/scaletowidth" width = '350' height = '300' />
              </center><br/><br/>  
              
              <center>
                <img src="https://napaporn502.files.wordpress.com/2014/12/1.jpg?w=503&h=345" width = '350' height = '300' />
              </center><br/><br/>  
          </td></tr></table></center>
          <div><br/><br/>
          </div>
        </div>
      </div>
    </div>
)
}