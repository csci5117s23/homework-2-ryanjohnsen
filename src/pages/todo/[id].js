import { useRouter } from "next/router"
import TodoItem from "../../components/TodoItem"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import Header from "../../components/Header"
import styles from "../../styles/Todo.module.css"
import CategoryBar from "../../components/CategoryBar"
import { getTodoItem, updateTodoItem } from "../../modules/data"


const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function TodoItemPage() {
    const router = useRouter()
    const id = router.query.id
    const [todos, setTodos] = useState("")
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [done, setDone] = useState(false);
    const [todoText, setTodoText] = useState("");
    // const [newText, setNewText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            let response = await getTodoItem(token, id);
            
            setTodoText(response);
        }
        fetchData();
    }, [userId]);

    async function updateDone() {
        console.log("update done");
        setDone(!done);

        const token = await getToken({ template: "codehooks" });
        let response = await updateTodoItem(token, id, {done: !done});
        console.log(response);

    }

    async function saveChanges() {
        // setTodoText("");

        const token = await getToken({ template: "codehooks" });
        await fetch(backend_base + "/todoitems/" + id, {
            method: "PATCH",
            headers: {
                // "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                text: todoText
            })
        });

        setTodoText(todoText);
    }
    
    return (
        <>
            <>
            {/* Add a header */}
            <Header> </Header>

            <div id={styles.mainContent}>
                <CategoryBar></CategoryBar>

                <div id={styles.rightSide}>

                    <div id={styles.todoContainer}>
                        <div id={styles.todoHeader}>
                            <h1> Todo Item </h1>
                            <div> 
                                <button id={styles.saveChangesButton} onClick={saveChanges}> Save Changes </button>
                                <button id={styles.seeTodoButton} onClick={() => router.push("/todos")}> Go back to Todos </button>
                            </div>
                        </div>

                        <div id={styles.todoItems}>
                            <div id={styles.todoContainer2}>
                                <div id={styles.textSide}> 
                                    <textarea id={styles.textareaInput} value={todoText} onChange={(e) => setTodoText(e.target.value)}  cols="30" rows="5"></textarea>
                                </div>
                                <div id={styles.buttonSide}>
                                    <input type="checkbox" onChange={updateDone} checked={done}></input>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
        </>
    )
}