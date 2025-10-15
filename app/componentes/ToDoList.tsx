import useToDo from "@/hooks/useToDo";
import React, {useEffect} from "react";
import {FilterOptions, TodoItem} from "@/lib/types";
import * as crypto from "expo-crypto";
import {FlatList, GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import ToDoFilter from "@/app/componentes/ToDoFilter";
import ToDoForm from "@/app/componentes/ToDoForm";
import ToDoItem from "@/app/componentes/ToDoItem";

const TodoList= () => {
    const {todos, db, loadToDos, addToDo, updateToDo} = useToDo();

    useEffect(() => {
        loadToDos();
    }, [db])


    const [filter, setFilter] = React.useState<FilterOptions>(FilterOptions.All);

    const addTodo = (text: string) => {
        const newToDo: TodoItem = {id: crypto.randomUUID(), text: text, done: false, createdAt: new Date()}
        addToDo(newToDo);
    };

    const toggleTodo = (todoItem: TodoItem) => {
        updateToDo({... todoItem, done: !todoItem.done});
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.title}>
                TODO List
            </Text>
            <ToDoForm addTodoHandler={addTodo} />
            <ToDoFilter selectedValue={filter} setFilter={setFilter} />
            <FlatList
                style={styles.list}
                data={todos.filter(todo => {
                    switch (filter) {
                        case FilterOptions.All:
                            return true;
                        case FilterOptions.Pending:
                            return !todo.done;
                        case FilterOptions.Done:
                            return todo.done;
                        default:
                            return true;
                    }
                }).sort((a, b) => {
                    const aDate = a.createdAt ?? new Date(0);
                    const bDate = b.createdAt ?? new Date(0);
                    return aDate === bDate ? 0 : aDate < bDate ? 1 : -1;
                })}
                renderItem={({ item }) => (
                    <ToDoItem todoItem={item} toggleTodo={toggleTodo} />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#2c3e50",
    },
    list: {
        width: "95%",
        backgroundColor: "transparent",
        marginTop: 20,
    },
});

export default TodoList;

