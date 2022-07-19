import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from 'states/todos';
import styled from 'styled-components';

const StyledTodoInput = styled.div``;

export default function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClickAddTodo = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
    inputRef.current?.focus();
  };

  return (
    <StyledTodoInput>
      <form action="" onSubmit={onClickAddTodo}>
        <input
          ref={inputRef}
          type="text"
          onChange={onChangeText}
          value={text}
        />
        <button type="submit">추가</button>
      </form>
    </StyledTodoInput>
  );
}
