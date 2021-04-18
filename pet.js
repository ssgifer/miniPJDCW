import Head from 'next/head'
import styles from '../styles/Pet.module.css'
import useSWR, {mutate} from 'swr'
import { useState , useEffect } from "react"
import axios from "axios"

const URL = `http://localhost:3001/api/pets`
const fetcher = URL => axios.get(URL).then(res => res.data)


export default function Pet() {

    const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false })

    const [type, setType] = useState("");
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [petList, setPetList] = useState([]);

    const getPets = async () => {
        const result = await axios.get(`${URL}`)
        setPetList(result.data.list)
    }
  
    useEffect(() => {
        getPets()
    },[])
  

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


  return (
    <div className={styles.container}>
      <Head>
        <title>Pets Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pets Shop 
        </h1>
        <br/>
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
                        <button className="btn btn-primary"> Buy </button>
                    </div>
                    </div>
                );
                })}    

        </div>
       
      </main>   
    </div>
  )
}
