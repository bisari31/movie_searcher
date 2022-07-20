import Header from 'components/Header';
import Main from 'components/main/Main';
import styled from 'styled-components';

const StyledHome = styled.div`
  margin: 0 auto;
  @media ${(props) => props.theme.device.laptop} {
    max-width: 1024px;
  }
`;

export default function Home() {
  return (
    <StyledHome>
      <Header />
      <Main />
    </StyledHome>
  );
}
