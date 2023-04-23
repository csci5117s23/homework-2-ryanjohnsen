import styles from '../styles/CategoryBar.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { addCategory, getCategories, deleteCategory } from '@/modules/data';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CategoryBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [updated, setUpdated] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            let response = await getCategories(token, userId);
            setCategories(response);
            // console.log(response)
        }
        fetchData();
    }, [userId, updated]);

    async function addCategoryToList() {
        // console.log("add category");
        // console.log(category);
        let cat = {
            category: category,
            userId: userId
        };
        let token = await getToken({ template: "codehooks" });
        let response = await addCategory(token, cat);
        setUpdated(!updated);
        // console.log(response);
    }

    async function removeCategoryFromList(cat) {
        console.log("remove category");
        console.log(cat)
        let token = await getToken({ template: "codehooks" });
        let response = await deleteCategory(token, cat._id);
        // console.log(response)
        setUpdated(!updated);
    }


    return (
        <>
            <div id={styles.sideBar}>
                <h1> Categories </h1>
                {/* text box */}
                <input id={styles.textInput} value={category} onChange={e => setCategory(e.target.value)} type="text" size="30" placeholder="Add a category"></input>
                <button id={styles.addCategoryButton} onClick={addCategoryToList}> Add </button>

                {/* list of categories */}
                <div id={styles.categoryList}>
                    {categories.map((cat) => (   
                        <div id={styles.categoryItem}>
                            <div id={styles.categoryLeft}> 
                                <Link href={"/todos/" + cat._id}>
                                    <span id={styles.text}> {cat.category} </span>
                                </Link>
                            </div>
                            <div id={styles.categoryRight}>
                                <button id={styles.deleteCategoryButton} onClick={() => removeCategoryFromList(cat)}> 
                                    Delete 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}
