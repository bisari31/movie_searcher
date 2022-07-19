import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Todo, toggleTodo } from 'states/todos';
import styled from 'styled-components';

const StyledTodoItem = styled.li``;

type ListType = {
  list: Todo;
};

export default function TodoItem({ list }: ListType) {
  const dispatch = useDispatch();

  const onChangeToggleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTodo(Number(e.target.value)));
  };

  return (
    <StyledTodoItem>
      <input
        type="checkbox"
        checked={list.isDone}
        value={list.id}
        onChange={onChangeToggleTodo}
      />
      {list.text}
    </StyledTodoItem>
  );
}
