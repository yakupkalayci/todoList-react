import React, {useState, useEffect} from "react";
import TodoList from "../todoList";
import styles from "./todoform.module.css";

export default function TodoForm() {
    const initial = [];

    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState(initial);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    const handleChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleClick = (id) => {
       setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted:!todo.isCompleted} : todo));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newTodo.trim()) {
            setTodos([...todos, {id: Date.now(), todo: newTodo.trim(), isCompleted: false}]);
            setNewTodo("");
        } else {
            setToastMessage("Inputs can't be left empty!");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }

    const clearCompleted = () => {
        let flag = false;
        todos.forEach(todo => {
            if(todo.isCompleted) flag = true
        });

        if(flag) {
            setTodos(todos.filter(todo => !todo.isCompleted));
        }
        else {
            setToastMessage("There is no completed todo!");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("todoList")) {
            setTodos(JSON.parse(localStorage.getItem("todoList")));
        }
        else {
            localStorage.setItem("todoList", JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        if(todos !== initial) {
            localStorage.setItem("todoList", JSON.stringify(todos));
        } 
    }, [todos]);

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.todoForm}>
                <input
                className={styles.todoInput}
                name="todo"
                placeholder="Enter a todo.."
                value={newTodo}
                onChange={(e) => handleChange(e)}
                />
            </form>
            <p className= {`${styles.toast} ${showToast ? styles.show : styles.hide}`}>{toastMessage}</p> <br />

            <TodoList todos={todos} handleClick={handleClick} clearCompleted={clearCompleted} />
        </div>
    );
}