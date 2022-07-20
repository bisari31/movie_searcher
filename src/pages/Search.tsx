import Header from 'components/Header';
import Main from 'components/main/Main';
import styled from 'styled-components';

const StyledSearch = styled.div`
  margin: 0 auto;
  @media ${(props) => props.theme.device.laptop} {
    max-width: 1024px;
  }
`;

export default function Search() {
  return (
    <StyledSearch>
      <Header />
      <Main />
    </StyledSearch>
  );
}
