import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}
interface InitialState {
  id: number;
  todo: Todo[];
}

const initialState: InitialState = {
  id: 0,
  todo: [],
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodo(state, action) {
      const { id } = state;
      state.id += 1;
      state.todo.push({ id, text: action.payload, isDone: false });
    },
    toggleTodo(state, action) {
      state.todo = state.todo.map((item) =>
        item.id === action.payload ? { ...item, isDone: !item.isDone } : item,
      );
    },
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
