import styled from 'styled-components';

const StyledFavorites = styled.div`
  margin: 0 auto;
  @media ${(props) => props.theme.device.laptop} {
    max-width: 1024px;
  }
`;

export default function Favorites() {
  return <StyledFavorites />;
}
