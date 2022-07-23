import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header/Header';

const StyledLayout = styled.div`
  margin: 0 auto;
  @media ${(props) => props.theme.device.laptop} {
    max-width: 1024px;
  }
`;

export default function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
    </StyledLayout>
  );
}
