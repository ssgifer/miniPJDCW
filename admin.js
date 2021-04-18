import Head from 'next/head'
import styles from '../styles/Pet.module.css'
import { useState , useEffect } from "react"
import axios from "axios"

const URL = `http://localhost:3001/api/pets`

export default function Pet() {

    const [type, setType] = useState("");
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [income, setIncome] = useState(0);
    const [petList, setPetList] = useState([]);

    const getPets = async () => {
        const result = await axios.get(`${URL}`)
        setPetList(result.data.list)
    }

    const getIncome = async () => {
        const result = await axios.get("http://localhost:3001/api/income")
        setIncome(result.data)
    }

    const addPet = async () => {
        const result = await axios.post(`${URL}`,{
            type: type,
            age: age,
            weight: weight,
            price: price
        })
        getPets()
    }

    useEffect(() => {
        getPets(),
        getIncome()
    },[])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Pets Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pets Shop (Admin)
        </h1>
        <h1 className={styles.description}>
          Summary Income : {income}
        </h1>
        <br/>
        <div className="information">
          <form action="">
            <div className="mb-3">
              <label htmlFor="type" className="form-lable">Type: </label>
              <input type="text" className="form-control" placeholder="Enter Type" onChange={(event) => {setType(event.target.value)}}/>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-lable">Age: </label>
              <input type="number" className="form-control" placeholder="Enter Age" onChange={(event) => {setAge(event.target.value)}}/>
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-lable">Weight: </label>
              <input type="number" className="form-control" placeholder="Enter Weight" onChange={(event) => {setWeight(event.target.value)}}/>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-lable">Price: </label>
              <input type="number" className="form-control" placeholder="Enter Price" onChange={(event) => {setPrice(event.target.value)}}/>
            </div>
            <button onClick={addPet}   className="btn btn-success">Add New Pet</button>
          </form>
          </div>
           <hr/>
        <div className={styles.list}>
                {petList.map((val, key) => {
                    return (
                    <div class={styles.card}>
                    <div class="card-body text-left">
                        <p class="card-text">Type: {val.type}</p>
                        <p class="card-text">Age: {val.age}</p>
                        <p class="card-text">Weight: {val.weight}</p>
                        <p class="card-text">Price: {val.price}</p>
                        <br/>
                        <button className="btn btn-success"> Get </button>
                        <button className="btn btn-warning"> Update </button>
                        <button className="btn btn-danger"> Delete </button>
                    </div>
                    </div>
                );
                })}    

        </div>
       
      </main>   
    </div>
  )
}
