import { useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import store from 'store';
import styled from 'styled-components';

import { ISearch } from 'types/movie';

import MovieItem from './MovieItem';

const StyledMovieList = styled.ul`
  @media ${({ theme }) => theme.device.laptop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function MovieList() {
  const [storageData, setStorageData] = useState<ISearch[]>([]);
  const { movies, isError, isLoading } = useAppSelector(
    (state) => state.movies,
  );

  const { pathname } = useLocation();
  const { movieTitle } = useParams();

  const checkPathName = pathname === '/favorites' ? storageData : movies;

  const getMovieList = (state: ISearch[]) =>
    state.map((movie, index: number) => (
      <MovieItem key={`${movie.imdbID + index}`} movie={movie} />
    ));

  useEffect(() => {
    setStorageData(store.get('movies'));
  }, [movies]);

  if (isLoading) return <div>loading........</div>;
  if (pathname === '/favorites' && (!storageData || storageData.length === 0))
    return <div>즐겨찾는 영화가 없습니다. 영화를 추가해 주세요.</div>;
  if (isError && pathname.includes('/search'))
    return <div>{movieTitle}에 대한 검색결과가 없습니다.</div>;

  return <StyledMovieList>{getMovieList(checkPathName)}</StyledMovieList>;
}
