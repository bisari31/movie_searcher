import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Delete, Search } from 'assets/svg';
import { getFetchData } from 'services/todo';
import { addMovies, checkError, toggleLoading } from 'states/movies';

const StyledHeader = styled.div<{ home: boolean }>`
  ${({ home }) =>
    home &&
    css`
      left: 25px;
      margin: 0 auto;
      max-width: 800px;
      position: absolute;
      right: 25px;
      top: 40%;
      transform: translateY(50%);
    `}
  form {
    align-items: center;
    display: flex;
    position: relative;
    width: 100%;
    input {
      background-color: ${({ theme }) => theme.colors.gray};
      border: none;
      border-radius: 35px;
      color: ${({ theme }) => theme.colors.black};

      flex: 1;
      font-size: 16px;
      height: 40px;
      padding: 5px 30px 5px 50px;
    }
    input::placeholder {
      color: ${({ theme }) => theme.colors.gray2};
    }

    button {
      align-items: center;
      background: none;
      border: none;
      display: flex;
      justify-content: center;
      padding: 0;
      position: absolute;
    }

    button:nth-of-type(1) {
      left: 20px;
    }
    button:nth-of-type(2) {
      display: none;
      right: 20px;
    }
    button + .on {
      display: flex;
    }
  }
  svg {
    fill: ${({ theme }) => theme.colors.gray2};
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;

export default function SearchBar() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const disaptch = useDispatch();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const handleSubmitFetchData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      disaptch(toggleLoading(true));
      navigate(`/search/${text}`, { state: text });
      const { data } = await getFetchData(text);
      if (data.Response === 'False') throw new Error();
      disaptch(addMovies(data.Search));
    } catch (err) {
      disaptch(checkError(true));
    } finally {
      disaptch(toggleLoading(false));
      disaptch(checkError(false));
    }
  };

  const handleDeleteText = () => {
    setText('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    setIsTyping(!!text);
  }, [text]);

  useEffect(() => {
    const state = location.state as string;
    if (location.pathname !== '/') {
      setText(state);
    }

    inputRef.current?.focus();
  }, []);

  return (
    <StyledHeader home={location.pathname === '/'}>
      <form action="" onSubmit={handleSubmitFetchData}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChangeText}
          placeholder="Search movie"
        />
        <button type="button" onClick={handleSubmitFetchData}>
          <Search width={23} />
        </button>
        <button
          type="button"
          className={isTyping ? 'on' : undefined}
          onClick={handleDeleteText}
        >
          <Delete width={25} />
        </button>
      </form>
    </StyledHeader>
  );
}
