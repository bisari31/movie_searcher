import styled from 'styled-components';

import { ISearch } from 'types/movie';
import noImage from 'assets/noImage.png';

const StyledMovieItem = styled.li`
  display: flex;
  height: 215px;
  margin-bottom: 20px;
  overflow-y: auto;
  &:last-child {
    margin-bottom: 0;
  }
  img {
    border-radius: 20px;
    height: 212px;
    object-fit: cover;
    width: 150px;
  }
  article {
    padding: 20px;
    h2 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 15px;
      word-break: break-all;
    }
    p {
      color: #999ca5;
      font-size: 14px;
      margin-top: 8px;
    }
  }
`;

interface IProps {
  movie: ISearch;
}

export default function MovieItem({ movie }: IProps) {
  // const limitTextLength =
  //   movie.Title.length < 16
  //     ? movie.Title
  //     : movie.Title.slice(0, 40).concat('...');

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
