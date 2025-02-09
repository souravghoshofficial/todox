import { useState } from "react";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import saveIcon from "../assets/save.svg";
import { useTodo } from "../contexts";

const Todo = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const taskComplete = () => {
    toggleComplete(todo.id)
  }

  return (
    <div
      className={`w-full md:w-[80%] mx-auto my-4 flex items-center justify-between px-4 py-2 ${
        todo.completed
          ? "bg-blue-200 dark:bg-blue-300"
          : "bg-red-200 dark:bg-red-300"
      }   rounded `}
    >
      <div className="w-full flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={taskComplete}
          className={`${isTodoEditable? "hidden" : "block"} cursor-pointer w-4 h-4 accent-green-600`}
        />
        <input
          type="text"
          value={todoMsg}
          readOnly={!isTodoEditable}
          onChange={(e) => setTodoMsg(e.target.value)}
          className={`w-[80%] px-0 py-1 border-0 outline-0 ${
            todo.completed ? "line-through" : ""
          } ${isTodoEditable ? "border-1 px-1 rounded" : ""}`}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={todo.completed}
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          className="p-2 bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <img
            src={`${isTodoEditable ? saveIcon : editIcon}`}
            alt="edit icon"
            className="w-7 md:w-5"
          />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="p-2 bg-white rounded cursor-pointer">
          <img src={deleteIcon} alt="delete icon" className="w-7 md:w-5" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
