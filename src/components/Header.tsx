import styled from 'styled-components';

import { Delete, Search } from 'assets/svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getFetchData } from 'services/todo';
import { useDispatch } from 'react-redux';
import { addMovies } from 'states/movies';

const StyledHeader = styled.header`
  align-items: center;
  /* background-color: red; */
  display: flex;
  margin-top: 65px;
  form {
    align-items: center;
    display: flex;
    position: relative;
    width: 100%;
    input {
      background-color: #2c3759;
      border: none;
      border-radius: 35px;
      color: #999ca5;
      flex: 1;
      font-size: 16px;
      height: 40px;
      padding: 5px 30px 5px 50px;
    }
    input::placeholder {
      color: #999ca5;
    }
    svg:nth-of-type(1) {
      left: 20px;
      position: absolute;
    }
    svg:nth-of-type(2) {
      position: absolute;
      right: 20px;
    }
  }
`;

export default function Header() {
  const [text, setText] = useState('');

  const disaptch = useDispatch();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const onSubmitFetchData = (e: FormEvent) => {
    e.preventDefault();
    getFetchData(text).then((res) => {
      disaptch(addMovies(res.data.Search));
    });
  };

  return (
    <StyledHeader>
      <form action="" onSubmit={onSubmitFetchData}>
        <input
          type="text"
          value={text}
          onChange={onChangeText}
          placeholder="Search movie"
        />
        <Search fill="#999ca5" width={23} />
        <Delete width={25} fill="#999ca5" />
      </form>
    </StyledHeader>
  );
}
