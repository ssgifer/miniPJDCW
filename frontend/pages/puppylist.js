import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/puppy.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/puppylist";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [puppylists, setPuppylists] = useState({});
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [puppylist, setPuppylist] = useState({});
  const [imageurl, setImageUrl] = useState("");
  

  useEffect(() => {
    getPuppylists();
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

  const getPuppylist = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('Puppy id: ', result.data)
    setPuppylist(result.data)
}
 
  const getPuppylists = async () => {
    let result = await axios.get(URL);
    setPuppylists(result.data.list);
  };

  const addPuppylist = async () => {
    let result = await axios.post(URL, {
      species, 
      sex, 
      age, 
      price, 
      imageurl
    });
    console.log(result);
    getPuppylists();
  };

  const deletePuppylist = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getPuppylists();
  };

  const updatePuppylist = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      species, 
      sex, 
      age, 
      price, 
      imageurl
    });
    console.log(result);
  };

  const showPuppylist = () => {
    if (puppylists && puppylists.length) {
      return puppylists.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>Image</b>
            <div className={styles.img} key={index}><img src={item.imageurl} width={200} hight={200} /><br /></div>
            <b>สายพันธุ์ (Species) : {item.species}<br /></b>
            <b>เพศ (Sex) : {item.sex}<br /></b>
            <b>อายุ (Age) : {item.age}<br /></b> 
            <b>ราคา (Price) : {item.price}<br /></b>
            <b>รูป (Image) : {item.imageurl}<br /></b>

            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getPuppylist(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updatePuppylist(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deletePuppylist(item.id)}
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
      <center><h1><ins>Puppys Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Puppys</h2>
        <br></br>สายพันธุ์ (Species) : 
        <input 
          type="text"
          name="species"
          onChange={(e) => setSpecies(e.target.value)}
        ></input>
        <br></br>เพศ (Sex) :
        <input
          type="text"
          name="sex"
          onChange={(e) => setSex(e.target.value)}
        ></input>
        <br></br>อายุ (Age) : 
        <input
          type="text"
          name="age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <br></br>ราคา (Price) : 
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <br></br>รูป (image) : 
        <input
          type="image"
          name= "imageurl"
          onChange={(e) => setImageUrl(e.target.value)}
          ></input>
          
        <button
          className={styles.button_add}
          onClick={() => addPuppylist(species, sex, age, price, imageurl)}
        >
          Add
        </button>
      </div></center>

      <div className={styles.list}>{showPuppylist()}</div>
      <div className={styles.list1}><b><i><ins>(selected puppy)</ins></i></b> <b>  
      สายพันธุ์ (Species) : </b>{puppylists.species}<b>  
      เพศ (Sex) : </b>{puppylists.sex}<b>
      อายุ (Age) : </b>{puppylists.age}<b>
      ราคา (Price) : </b>{puppylists.price}<b>
      รูป (image) : </b>{puppylists.imageurl}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
