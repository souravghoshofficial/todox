import React, { useState, useEffect } from "react";
import { Header, Todo, AddTaskInputField } from "./components";
import { ThemeProvider, TodoProvider, useTheme } from "./contexts";

const App = () => {
  const {defaultTheme} = useTheme()
  const [theme, setTheme] = useState(defaultTheme);
  const [todos, setTodos] = useState([])

  const toggleTheme = () => {
    if(theme === "light") setTheme("dark")
    else setTheme("light")
  };

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }


  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }
 
  useEffect(() => {
    const localTheme = localStorage.getItem("theme")

    if(localTheme){
      setTheme(localTheme)
    }
    
  }, [])

  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  
  
  useEffect(() => {
    localStorage.setItem("theme" , theme)
    const html = document.querySelector("html");
    html.classList.remove("light", "dark");
    if(theme === "light"){
      html.classList.add("light")
    }
    else{
      html.classList.add("dark")
    }
  }, [theme]);

  return (
    <ThemeProvider value={{ defaultTheme , toggleTheme }}>
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
        <div className="bg-white dark:bg-gray-950  w-full h-screen flex items-center justify-center">
          <div className="w-[90%] md:w-[50%] h-screen mx-auto  flex flex-col items-center">
            <Header />
            <hr className="w-full h-2 my-1 dark:text-white" />
            <AddTaskInputField />

            {/* Todo Items */}
            <div className="w-full mt-8 px-1">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <Todo todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
