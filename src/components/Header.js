
import { UserButton } from '@clerk/nextjs';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';


export default function Header() {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    return (
        <>
            <div id={styles.mainHead}>
                {/* make this link clickable */}
                <Link href={ userId ? "/todos" : "/" } id={styles.appName}>
                    TODO App
                </Link>
                <div id={styles.userButton}> 
                    <UserButton />  
                </div>
            </div>
        </>
    )
}