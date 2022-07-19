import { useAppSelector } from 'hooks';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const StyledTodoList = styled.ul``;

export default function TodoList() {
  const todo = useAppSelector((store) => store.todos.todo);

  return (
    <StyledTodoList>
      {todo.map((list) => (
        <TodoItem key={list.id} list={list} />
      ))}
    </StyledTodoList>
  );
}
