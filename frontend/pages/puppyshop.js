import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/puppys";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const puppyshop = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const selStu = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }

  const showPuppys = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>สายพนธุ์ (Species) : </b> {item.species}</div>
            <div><b>เพศ (Sex) : </b> {item.sex}</div>
            <div><b>อายุ (Age) : </b> {item.age} </div>
            <div><b>ราคา (Price) : </b> {item.age} </div>

            <div>
            <button
              className={styles.btn}
              onClick={() => selStu(item.id)}
            >
              Select
            </button></div>
          </div>
        );
      });
    } 
    else {
      return 
      <center>
          <p>Loading...</p>;
      </center>
    }
  };
  return (
    <Layout>
       <Head>
        <title>Puppys Shop</title>
    </Head>
    <div className={styles.container}><Navbar />
      <div className={styles.title}>
      </div>
      <div className={styles.list}>
        {showPuppys()}
      </div>
      
    </div>
    </Layout>
  );
};
export default puppyshop;
