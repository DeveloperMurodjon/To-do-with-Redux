import React, { useRef, useState } from "react";
import addImage from "/add.png";
import editImg from "/edit.png";
import checkImg from "/check.png";
import delImg from "/delete.png";
import uncheckImg from "/unchecked.png"
import { useDispatch, useSelector } from "react-redux";
import { addToDo, remove, update, toggleCompleted } from "./redux/toDoSlice";

function App() {
  const [todo, setTodo] = useState({ id: "", text: "", completed: false });
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const inputRef = useRef(null)

  //Add and update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.text.trim()) return;

    if (todo.id) {
      dispatch(update({ id: todo.id, text: todo.text }));
    } else {
      dispatch(addToDo({ id: Date.now().toString(), text: todo.text }));
    }

    setTodo({ id: "", text: "" });
  };

  // Edit
  const handleEdit = (editTodo) => {
    setTodo({ id: editTodo.id, text: editTodo.text });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0)
  };

  // Remove
  const handleRemove = (id) => {
    if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      dispatch(remove(id));
    }
  };

  //Checked-Uncheked
  const handleCheck = (id) => {
    dispatch(toggleCompleted(id))
  }

  return (
    <div className="mx-auto items-center flex flex-col mt-25 mb-40">
      <div className="items-center pt-12 pl-16 pr-21 pb-14 rounded-2xl bg-[#1D1825]">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={todo.text}
              onChange={(e) => setTodo({ ...todo, text: e.target.value })}
              placeholder="Add a new task"
              className="w-[381px] mr-4 text-white border rounded-lg pt-[11px] pb-[10px] pl-[15px] border-[#3E1671] focus:outline-none focus:ring-0"
            />
            <button type="submit">
              <img src={addImage} />
            </button>
          </div>
        </form>

        <div>
          <h1 className="mt-15 mb-4 text-white">Tasks to do - {todos.filter(todo => !todo.completed).length}</h1>

          <ul>
            {todos.filter((todo) => !todo.completed)
              .map((todo) => (
                <li
                  className="flex items-center justify-between bg-[#15101C] py-6 px-5 rounded-md mb-2"
                  key={todo.id}
                >
                  <p className="flex items-center text-[#9E78CF]">{todo.text}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCheck(todo.id)} className="cursor-pointer">
                      <img src={checkImg} />
                    </button>
                    <button
                      onClick={() => handleEdit(todo)} className="cursor-pointer">
                      <img className="w-[21px]" src={editImg} />
                    </button>
                    <button
                      onClick={() => handleRemove(todo.id)} className="cursor-pointer">
                      <img src={delImg} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="mt-11 mb-4 text-white">Done - {todos.filter(todo => todo.completed).length}</h2>
          <ul>
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <li key={todo.id} className="bg-[#15101C] line-through text-[#78CFB0] flex items-center justify-between px-6 py-5 rounded-md">
                  <p className="bg-[#15101C] line-through text-[#78CFB0]">
                    {todo.text}
                  </p>
                  <button
                    onClick={() => handleCheck(todo.id)}
                    className="cursor-pointer">
                    <img className="w-[30px]" src={uncheckImg} />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
