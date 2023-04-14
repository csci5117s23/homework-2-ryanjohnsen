import styles from '../styles/TodoItem.module.css'

export default function TodoItem({text}) {
    

    return (
        <>
            <div id={styles.todoContainer}>
                <div id={styles.textSide}> 
                    <span id={styles.text}> {text} </span>
                </div>
                <div id={styles.buttonSide}>
                    <input type="checkbox"></input>
                </div>
            </div>
        </>
    )
}