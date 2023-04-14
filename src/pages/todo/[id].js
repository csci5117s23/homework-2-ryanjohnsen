import { useRouter } from "next/router"
import TodoItem from "../../components/TodoItem"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function TodoItemPage() {
    const router = useRouter()
    const id = router.query.id
    const [todos, setTodos] = useState([])
    const { isLoaded, userId, sessionId, getToken } = useAuth();

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
        }
        fetchData();
    }, [userId]);
    
    return (
        <>
            <TodoItem todo={todos}>  </TodoItem>
        </>
    )
}