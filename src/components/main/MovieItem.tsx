import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { ISearch } from 'types/movie';
import noImage from 'assets/noImage.png';
import { Favorite, FavoriteLine } from 'assets/svg';
import { toggleFavoriteOpion } from 'states/movies';

const StyledMovieItem = styled.li`
  display: flex;
  height: 215px;
  justify-content: center;
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
    width: 100%;
    h2 {
      color: ${({ theme }) => theme.colors.black};
      font-size: 24px;
      font-weight: 500;
      height: 48px;
      margin-bottom: 15px;
      overflow-y: hidden;
      word-break: break-all;
    }
    p {
      color: ${({ theme }) => theme.colors.black};
      font-size: 14px;
      margin-top: 8px;
    }
  }
`;

const StyledButton = styled.button<{ isChecked: boolean | undefined }>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray};
  border: none;
  border-radius: 7px;
  color: ${({ theme, isChecked }) =>
    isChecked ? '#f66166' : theme.colors.gray2};
  display: flex;
  font-size: 13px;
  font-weight: 400;
  margin-top: 20px;
  padding: 5px 10px;
  svg {
    align-items: center;
    display: flex;
    fill: #f66166;
    justify-content: center;
    margin-right: 10px;
  }
`;

interface IProps {
  movie: ISearch;
}

export default function MovieItem({ movie }: IProps) {
  const dispatch = useDispatch();

  const handleChangeFavorite = () => {
    dispatch(toggleFavoriteOpion(movie));
  };

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
        <StyledButton
          isChecked={movie.favorite}
          onClick={handleChangeFavorite}
          className="favoriteBtn"
          type="button"
        >
          {movie.favorite ? (
            <Favorite width={20} height={20} />
          ) : (
            <FavoriteLine width={20} height={20} />
          )}
          Favorite
        </StyledButton>
      </article>
    </StyledMovieItem>
  );
}
