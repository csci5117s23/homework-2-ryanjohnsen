import styles from '../styles/TodoItem.module.css'
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Link from 'next/link';

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function TodoItem({todo}) {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [done, setDone] = useState(todo.done);
    
    async function updateDone() {
        console.log("update done");
        setDone(!done);

        const token = await getToken({ template: "codehooks" });
        await fetch(backend_base + "/todoitems/" + todo._id, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                done: !done
            })
        });
    }

    return (
        <>
            <div id={styles.todoContainer}>
                <div id={styles.textSide}> 
                    <Link href={"/todo/" + todo._id} >
                        <span id={styles.text}> {todo.text} </span>
                    </Link>
                </div>
                <div id={styles.buttonSide}>
                    <input type="checkbox" onChange={updateDone} checked={done}></input>
                </div>
            </div>
        </>
    )
}