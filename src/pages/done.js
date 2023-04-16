import { UserButton } from '@clerk/nextjs';
import TodoItem from '../components/TodoItem';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/Todo.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'next/router';

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


export default function Todos() {
    // fetch todo item components
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todos, setTodos] = useState([]);
    const router = useRouter();

    // const token = await getToken({ template: "codehooks" });

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            const response = await fetch(backend_base + "/todoitems", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            let data = await response.json();
            // sort by created time
            data = data.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
            setTodos(data);
            // setTodos(data);
        }
        fetchData();
    }, [userId]);
        

    function routeToTodos() {
        router.push("/todos");
    }

    return (
        <>
            {/* Add a header */}
            <Header> </Header>

            <div id={styles.mainContent}>
                <div id={styles.sideBar}>
                    <h1> Categories </h1>
                </div>

                <div id={styles.rightSide}>

                    <div id={styles.todoContainer}>
                        <div id={styles.todoHeader}>
                            <h1> Done Todo Items </h1>
                            <div> 
                                {/* <input id={styles.textInput} value={todoText} onChange={e => setTodoText(e.target.value)} type="text" size="30" placeholder="Add a todo item"></input> */}
                                {/* <button id={styles.addTodoButton} onClick={addTodoItem}> Add </button> */}
                                <button id={styles.seeTodoButton} onClick={routeToTodos}> See Not Done </button>
                            </div>
                        </div>

                        <div id={styles.todoItems}>
                            {todos.map((todo) => (
                                todo.done ? <TodoItem key={todo._id} todo={todo}></TodoItem> : <></>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}