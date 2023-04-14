import { UserButton } from '@clerk/nextjs';
import TodoItem from '../components/TodoItem';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/Todo.module.css';

export default function Todos() {
    // fetch todo item components
    

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
                            <h1> Todo Items </h1>
                            <div> 
                                <input id={styles.textInput} type="text" size="30" placeholder="Add a todo item"></input>
                                <button id={styles.addTodoButton}> Add </button>
                            </div>
                        </div>

                        <div id={styles.todoItems}>
                            {/* <Link href="/todos/[id]" as="/todos/1"> */}
                                <TodoItem text="todo info goes here todo info goes here todo info goes here todo info goes heretodo info goes here todo info goes here todo info goes here todo info goes here todo info goes here">
                                </TodoItem>
                            {/* </Link> */}
                                <TodoItem text="Walk the dog">
                                </TodoItem>
                        </div>

                    </div>
                    {/* <div>
                        <input type="text" placeholder="Add a todo"></input>
                        <button> Add </button>
                    </div>

                    <div>
                        <Link href="/todos/[id]" as="/todos/1">
                            <TodoItem> </TodoItem> 
                        </Link>
                        <TodoItem> </TodoItem>
                        <TodoItem> </TodoItem>
                    </div> */}
                </div>
            </div>
        </>
    )
}