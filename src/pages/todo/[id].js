import { useRouter } from "next/router"
import TodoItem from "../../components/TodoItem"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import Header from "../../components/Header"
import styles from "../../styles/Todo.module.css"


const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function TodoItemPage() {
    const router = useRouter()
    const id = router.query.id
    const [todos, setTodos] = useState("")
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [done, setDone] = useState(false);
    const [todoText, setTodoText] = useState("");
    const [newText, setNewText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            const response = await fetch(backend_base + "/todoitems/" + id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            const data = await response.json();
            setTodos(data);
            setDone(data.done);
            setTodoText(data.text);
            setNewText(data.text);
        }
        fetchData();
    }, [userId]);

    function routeToTodos() {
        router.push("/todos");
    }

    async function updateDone() {
        console.log("update done");
        setDone(!done);

        const token = await getToken({ template: "codehooks" });
        await fetch(backend_base + "/todoitems/" + todos._id, {
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

    async function saveChanges() {

        const token = await getToken({ template: "codehooks" });
        await fetch(backend_base + "/todoitems/" + todos._id, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                text: newText
            })
        });
        setTodoText(newText);

    }
    
    return (
        <>
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
                            <h1> Todo Item </h1>
                            <div> 
                                <button id={styles.saveChangesButton} onClick={saveChanges}> Save Changes </button>
                                <button id={styles.seeTodoButton} onClick={routeToTodos}> Go back to Todos </button>
                            </div>
                        </div>

                        <div id={styles.todoItems}>
                            <div id={styles.todoContainer2}>
                                <div id={styles.textSide}> 
                                    <textarea id={styles.textareaInput} value={todoText} onChange={(e) =>  {setNewText(e.target.value); setTodoText(e.target.value);}}  cols="30" rows="5"></textarea>
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