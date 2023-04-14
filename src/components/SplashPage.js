// what should i import here?
// import React from 'react';
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import styles from '../styles/SplashPage.module.css';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Header from './Header';

export default function SplashPage(){
    // use clerk to see if user is signed in
    // if so, redirect to /todo
    // if not, show sign in button
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

    if (userId) {
        router.push("/todos");
    }

    return (
        <>
            {/* { userId ? router.push("/todos") : <h1> Not signed in </h1>} */}
            <div id={styles.mainDiv}>
                <Header></Header>
                <SignedOut>
                    <div id={styles.splashDiv}>
                        <div id={styles.welcomeDiv}> 
                            <h1> Ryan's TODO site </h1>
                            <p> Welcome to the site! Sign in to get started </p>
                        </div>
                        <div id={styles.splashSignIn}>
                            <SignIn></SignIn>
                        </div>
                    </div>
                </SignedOut>
            </div>
        </>
    )
}