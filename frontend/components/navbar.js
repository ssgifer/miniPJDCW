import styles from '../styles/navbar.module.css'

const Navbar = () => (
    <div className={styles.topbar}>
    <ol className={styles.navbar}>
        

        <li className={styles.text}><a href="/">&nbsp;<b>Home</b></a></li>
        <li className={styles.text1}><a href="/puppyshop">&nbsp;<b>Puppy Shop</b></a></li>
        <li className={styles.text5}><a href="/puppylist">&nbsp;<b>Admin</b></a></li>

        <li className={styles.right}><a href="/logout"><b>Logout</b>&nbsp;</a></li>
        <li className={styles.right}><a href="/login">&nbsp;<b>Login</b></a></li>
        <li className={styles.right}><a href="/register">&nbsp;<b>Register</b></a></li>
        <li className={styles.right}><a href="/profile">&nbsp;<b>Profile</b></a></li>
    </ol>
    </div>
)

export default Navbar