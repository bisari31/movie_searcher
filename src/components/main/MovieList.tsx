import { useAppSelector } from 'hooks';
import styled from 'styled-components';
import MovieItem from './MovieItem';

const StyledMovieList = styled.ul`
  @media ${({ theme }) => theme.device.laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function MovieList() {
  const movies = useAppSelector((state) => state.movies.movies);
  console.log(movies);
  return (
    <StyledMovieList>
      {movies.map((movie, index) => (
        <MovieItem key={`${movie.imdbID + index}`} movie={movie} />
      ))}
    </StyledMovieList>
  );
}
