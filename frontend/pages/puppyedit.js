import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/puppyedit.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/puppys";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [puppys, setPuppys] = useState({});
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState(0);
  const [imageurl, setImageUrl] = useState("");
  const [puppy, setPuppy] = useState({});

  useEffect(() => {
    getPuppys();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPuppy = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('Puppy id: ', result.data)
    setPuppy(result.data)
}
 
  const getPuppys = async () => {
    let result = await axios.get(URL);
    setPuppys(result.data.list);
  };

  const addPuppy = async () => {
    let result = await axios.post(URL, {
      species, 
      sex, 
      age, 
      price, 
      imageurl
    });
    console.log(result);
    getPuppys();
  };

  const deletePuppy = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getPuppys();
  };

  const updatePuppy = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      species, 
      sex, 
      age, 
      price, 
      imageurl
    });

    console.log(result);
  };

  const showPuppys = () => {
    if (puppys && puppys.length) {
      return puppys.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>Image</b>
            <div className={styles.img} key={index}><img src={item.imgeurl} width={200} hight={200} /><br /></div>
            <b>สายพนธุ์ (Species) : {item.species}<br /></b>
            <b>เพศ (Sex) : {item.sex}<br /></b>
            <b>อายุ (Age) : {item.age}<br /></b> 
            <b>ราคา (Price) : {item.price}<br /></b>

            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getPuppy(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updatePuppy(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deletePuppy(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    } 
    else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <h1><ins>Puppys Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Puppys</h2>
        Species :
        <input
          type="text"
          name="species"
          onChange={(e) => setName(e.target.value)}
        ></input>
        Sex :
        <input
          type="text"
          name="sex"
          onChange={(e) => setSex(e.target.value)}
        ></input>
        Age :
        <input
          type="text"
          name="age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        Price:
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addPuppy(species, sex, age, image)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showPuppys()}</div>
      <div className={styles.list1}><b><i><ins>(selected puppy)</ins></i></b> <b>  
        Species : </b>{puppys.species}<b>  
          Sex : </b>{puppys.sex}<b>  
            Age : </b>{puppys.age}<b>
              Prince : </b>{puppys.price}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
