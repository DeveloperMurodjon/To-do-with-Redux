import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todos.push(action.payload);
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((toDo) => toDo.id !== action.payload);
    },
    update: (state, action) => {
      const { id, text } = action.payload;
      const todoIndex = state.todos.findIndex((t) => t.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].text = text;
      }
    },
    toggleCompleted: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addToDo, remove, update, toggleCompleted } = toDoSlice.actions;

export default toDoSlice.reducer;
