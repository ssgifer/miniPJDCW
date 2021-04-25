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
      <div className={styles.container}>
        </div>
                <div class="topnav">
                <a class="active" href="Home.html">หน้าแรก</a>
                <a href="puppy.html">ลูกสุนัข</a>
                <a href="food.html">อาหาร</a>
                <a href="stick.html">ขนม</a>
                <a href="toy.html">ของเล่น</a>
                <a href="clothes.html">เสื้อผ้า</a>
                <a href="bed.html">เบาะนอน</a>
                <a href="etc.html">อื่นๆ</a>
            </div>

    </Layout>
    )
}
        
            