import styled from 'styled-components';
import { ISearch } from 'types/movie';

import noImage from 'assets/noImage.png';

const StyledMovieItem = styled.li`
  display: flex;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  img {
    border-radius: 20px;
    width: 150px;
  }
  article {
    padding: 20px;
    h2 {
      font-size: 25px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    p {
      color: #999ca5;
      font-size: 16px;
      margin-top: 10px;
    }
  }
`;

interface IProps {
  movie: ISearch;
}

export default function MovieItem({ movie }: IProps) {
  return (
    <StyledMovieItem>
      <div>
        {movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`${movie.Title}_img`} />
        ) : (
          <img src={noImage} alt={`${movie.Title}_img`} />
        )}
      </div>
      <article>
        <h2>{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>
      </article>
    </StyledMovieItem>
  );
}
