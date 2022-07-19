import { ChangeEvent, FormEvent, useState } from 'react';
import { getFetchData } from 'services/todo';
import styled from 'styled-components';

const StyledInput = styled.form``;

export default function Input() {
  const [text, setText] = useState('');

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmitData = (e: FormEvent) => {
    e.preventDefault();
    getFetchData(text).then((res) => console.log(res.data));
  };

  return (
    <StyledInput onSubmit={onSubmitData}>
      <input type="text" value={text} onChange={onChangeText} />
      <button type="submit">검색</button>
    </StyledInput>
  );
}
