import { useAppSelector } from 'hooks';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import MovieItem from './MovieItem';

const StyledMovieList = styled.ul`
  @media ${({ theme }) => theme.device.laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function MovieList() {
  const { movies, isError, isLoading } = useAppSelector(
    (state) => state.movies,
  );

  const location = useLocation();
  const state = location.state as string;

  if (isError) return <div>{state}에 대한 검색결과가 없습니다.</div>;
  if (isLoading) return <div>loading........</div>;

  return (
    <StyledMovieList>
      {movies.map((movie, index) => (
        <MovieItem key={`${movie.imdbID + index}`} movie={movie} />
      ))}
    </StyledMovieList>
  );
}
