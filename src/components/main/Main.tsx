import styled from 'styled-components';

import MovieList from './MovieList';

const StyledMain = styled.main`
  margin-top: 45px;
`;

export default function Main() {
  return (
    <StyledMain>
      <MovieList />
    </StyledMain>
  );
}
