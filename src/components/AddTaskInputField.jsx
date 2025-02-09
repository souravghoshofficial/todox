import {useState} from "react";
import { useTodo } from "../contexts";

const AddTaskInputField = () => {
  const [todo, setTodo] = useState("")
  const {addTodo} = useTodo()

  const handleSubmit = (e) => {
      e.preventDefault()
      if(!todo) return
      addTodo({todo , isCompleted: false})
      setTodo("")
  }
  return (
    <form  onSubmit={handleSubmit} className="w-full mt-4 flex items-center justify-center gap-0">
      <input
        type="text"
        placeholder="Add a task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className=" w-[80%] md:w-[70%] border-2 dark:border-gray-100 dark:text-white border-r-0 px-3 py-2 rounded-l focus:outline-none focus:border-sky-500 "
      />
      <button type="submit" className="cursor-pointer px-4 py-2 border-2 border-orange-500 bg-orange-500 rounded-r font-medium">
        Add
      </button>
    </form>
  );
};

export default AddTaskInputField;
