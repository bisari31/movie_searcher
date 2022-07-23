import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Left } from 'assets/svg';

const StyledNav = styled.nav<{ home: boolean }>`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: 50px 0 35px 0;
  svg {
    display: ${({ home }) => (home ? 'none' : 'flex')};
    position: absolute;
    left: 0;
    polyline {
      stroke: ${({ theme }) => theme.colors.gray2};
    }
  }
  svg:hover {
    cursor: pointer;
  }
  position: relative;
  ul {
    display: flex;
    li {
      color: ${(props) => props.theme.colors.gray2};
      font-weight: 500;
      margin: 0;
    }
    li + li {
      margin-left: 30px;
    }
    .actvie {
      color: ${(props) => props.theme.colors.black};
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    svg {
      display: none;
    }
    li:last-child {
      margin-right: 30px;
    }
  }
`;

export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const checkMainPage = pathname === '/';

  const handleGoBack = () => navigate(-1);

  return (
    <StyledNav home={checkMainPage}>
      <Left onClick={handleGoBack} width={22} />
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'actvie' : undefined)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'actvie' : undefined)}
            to="/favorites"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}
