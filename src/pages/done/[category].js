import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Header from '@/components/Header';
import styles from '@/styles/Todo.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import CategoryBar from '@/components/CategoryBar';
import { getTodoItems } from '@/modules/data';
import TodoItem from '@/components/TodoItem';
import { getAllTodoItems, getCategory, addTodoItem } from '@/modules/data';

export default function todosWithCategory() {
    // fetch todo item components
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todos, setTodos] = useState([]);
    const router = useRouter();
    const category = router.query.category;
    const [catText, setCatText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            let response = await getTodoItems(token, userId, true, null);
            response = response.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
            setTodos(response);

            let cat = await getCategory(token, category);
            let catText = cat[0].category;
            setCatText(catText);

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
                        <div id={styles.categoryHeader}>
                            <h1> Category: {catText} </h1>
                            <div> 
                                <button id={styles.seeTodoButton} onClick={() => router.push("/todos/" + category)}> See Not Done </button>
                            </div>
                        </div>

                        <div id={styles.todoItems}>
                            {todos.map((todo) => (
                                todo.done && catText == todo.category ? <TodoItem key={todo._id} todo={todo}></TodoItem> : <></>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}