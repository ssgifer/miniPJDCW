import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/puppylists";
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

  const showPuppylist = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>Image</b><img src={item.imgeurl} width={200} hight={200} /><br />
            <div><b>Species : </b> {item.species}</div>
            <div><b>Sex : </b> {item.sex}</div>
            <div> <b>Age : </b> {item.age} </div>
            <div><b>Price : </b> {item.price}</div>
            
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
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <Layout>
       <Head>
        <title>Puppy Shop</title>
    </Head>
    <div className={styles.container}><Navbar />
      <div className={styles.title}>
      </div>
      <div className={styles.list}>
        {showPuppylist()}
      </div>
      
    </div>
    </Layout>
  );
};
export default puppyshop;
