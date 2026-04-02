import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>MyShop</Link>
            <div style={styles.links}>
                {isAuthenticated ? (
                    <>
                        <span style={styles.greeting}>Hi, {user?.name}</span>
                        <button onClick={logout} style={styles.btn}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1a1a2e', color: '#fff' },
    brand: { color: '#e94560', fontWeight: 700, fontSize: '1.4rem', textDecoration: 'none' },
    links: { display: 'flex', alignItems: 'center', gap: '1rem' },
    link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
    btn: { background: '#e94560', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 6, cursor: 'pointer' },
    greeting: { color: '#ccc', fontSize: '0.9rem' },
}

export default Navbar