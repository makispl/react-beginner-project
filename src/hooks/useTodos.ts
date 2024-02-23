import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todos";

export default function useTodos() {
  // We want to render the stored todos each time we refresh, but if there are not any we render the dummyData. Instead of using a second useEffect, we may
  // put it inside the useState initialiser
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });
  // useState compares the references of the todos list. When it sees a different new list which setTodos returns, it re-renders.

  // useEffect stores the todos changes each time the [todo] list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        title,
        completed: false,
      },
      ...prevTodos, // we add the new todo and the previous ones spread as they was
    ]);
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return {
    todos,
    setTodoCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompletedTodos,
  };
}
