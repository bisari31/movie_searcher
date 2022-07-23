import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import SearchBar from 'components/Header/SearchBar';
import Nav from './Nav';

const StyledHeader = styled.header``;

export default function Header() {
  const { pathname } = useLocation();

  return (
    <StyledHeader>
      <Nav />
      {pathname !== '/favorites' && <SearchBar />}
    </StyledHeader>
  );
}
