import Header from 'components/Header';
import styled from 'styled-components';

const StyledHome = styled.div`
  left: 50%;
  margin: 0 auto;
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 80%;
  @media ${(props) => props.theme.device.laptop} {
    max-width: 900px;
  }
`;

export default function Home() {
  return (
    <StyledHome>
      <Header />
    </StyledHome>
  );
}
