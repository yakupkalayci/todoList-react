import React from "react";
import styles from "./todolist.module.css";

export default function TodoList({todos, handleClick, clearCompleted}) {

    return (
        <div className={styles.todoListContainer}>
            {
                todos.length ?
                (
                    <div>
                        <ul>
                            {
                            todos.map(todo => (
                            <li className={`${styles.todo} ${todo.isCompleted && styles.completed}`} key={todo.id} onClick={() => handleClick(todo.id)}>{todo.todo}</li>
                            ))
                            }
                        </ul>
                        <button className={styles.clearBtn} onClick={() => clearCompleted()}>Clear Completed</button>
                    </div>
                )
                :
                <p className={styles.info}>You haven't added a todo yet!</p>
            }
        </div>
    );
}