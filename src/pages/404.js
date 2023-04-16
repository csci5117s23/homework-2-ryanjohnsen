// make a default 404 page 
import styles from '../styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
    return (
        <>
            <div id={styles.mainDiv}> 
                <div id={styles.fourOFourDiv}> 
                    <h1> The page you're looking for ain't here 😔 </h1>
                    <p> Sorry lil bro  </p>
                    <Link id={styles.backButton} href="/todos" > Go back to todos </Link>
                </div>
            </div>

        </>
    )
}