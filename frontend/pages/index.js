import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

const gotowebsite = () => {
  navigator.clipboard.writeText(token)
}

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>Home Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <h1>Puppy Shop</h1>
        <img src ="https://cms.kapook.com/uploads/tag/34/ID_33400_57eded5c4a93a.png" />
        <button onClick={gotowebsite}> Go To This Website </button>
    </div>    
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
