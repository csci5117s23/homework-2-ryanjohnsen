import styles from '../styles/TodoItem.module.css'
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Link from 'next/link';
import { updateTodoItem } from '@/modules/data';

export default function TodoItem({todo}) {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [done, setDone] = useState(todo.done);
    
    async function updateDone() {
        console.log("update done");
        setDone(!done);

        const token = await getToken({ template: "codehooks" });
        await updateTodoItem(token, todo._id, {done: !done})
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