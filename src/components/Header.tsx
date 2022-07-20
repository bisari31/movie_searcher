import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Delete, Search } from 'assets/svg';
import { getFetchData } from 'services/todo';
import { addMovies, checkError } from 'states/movies';

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

    button {
      border: none;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding: 0;
    }

    button:nth-of-type(1) {
      left: 20px;
    }
    button:nth-of-type(2) {
      right: 20px;
    }
  }
`;

export default function Header() {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const disaptch = useDispatch();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const handleSubmitFetchData = (e: FormEvent) => {
    e.preventDefault();
    getFetchData(text)
      .then((res) => {
        navigate(`/search/${text}`, {
          state: text,
        });
        if (res.data.Response === 'False') throw new Error();
        disaptch(checkError(false));
        disaptch(addMovies(res.data.Search));
      })
      .catch(() => disaptch(checkError(true)));
  };

  const handleDeleteText = () => {
    setText('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const state = location.state as string;
    if (location.pathname !== '/') setText(state);
    inputRef.current?.focus();
  }, []);

  return (
    <StyledHeader>
      <form action="" onSubmit={handleSubmitFetchData}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChangeText}
          placeholder="Search movie"
        />
        <button type="button" onClick={handleSubmitFetchData}>
          <Search fill="#999ca5" width={23} />
        </button>
        <button type="button" onClick={handleDeleteText}>
          <Delete width={25} fill="#999ca5" />
        </button>
      </form>
    </StyledHeader>
  );
}
