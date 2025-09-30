import { getAllTodos, postToDo, putToDo } from "@/lib/db";
import { TodoItem } from "@/lib/types";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";


const useToDo = () => {
    const [todos, setTodos] = React.useState<TodoItem[]>([]);
    const db = useSQLiteContext();

    const loadToDos = async () => {
        const result = await getAllTodos(db);
        setTodos(result);
    } 

    const addToDo = async (newTask: TodoItem) => {
        const result = await postToDo(db,newTask);
        setTodos([...todos, newTask]);
    }

    const updateToDo = async (updatedTask: TodoItem) => {
        const result = await putToDo(db,updatedTask);
        setTodos(todos.map(todo => todo.id === updatedTask.id ? result : todo))
    }

    return {
        todos,
        db,
        loadToDos,
        addToDo,
        updateToDo
    }
}

export default useToDo;