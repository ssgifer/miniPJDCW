import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
    
export default function Home({ token }) {
 
    return (
      <Layout>
      <Head>
          <title>Puppy Shop</title>
      </Head>

    </Layout>
    )
}
        
            