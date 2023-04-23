import { UserButton } from '@clerk/nextjs';
import TodoItem from '../components/TodoItem';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/Todo.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import CategoryBar from '@/components/CategoryBar';
import { getTodoItems } from '@/modules/data';


export default function Todos() {
    // fetch todo item components
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todos, setTodos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            let response = await getTodoItems(token, userId, true);
            // sort by created time
            response = response.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
            setTodos(response);
        }
        fetchData();
    }, [userId]);
        

    return (
        <>
            {/* Add a header */}
            <Header> </Header>

            <div id={styles.mainContent}>
                <CategoryBar/> 

                <div id={styles.rightSide}>

                    <div id={styles.todoContainer}>
                        <div id={styles.todoHeader}>
                            <h1> Done Todo Items </h1>
                            <div> 
                                {/* <input id={styles.textInput} value={todoText} onChange={e => setTodoText(e.target.value)} type="text" size="30" placeholder="Add a todo item"></input> */}
                                {/* <button id={styles.addTodoButton} onClick={addTodoItem}> Add </button> */}
                                <button id={styles.seeTodoButton} onClick={() => router.push("/todos")}> See Not Done </button>
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