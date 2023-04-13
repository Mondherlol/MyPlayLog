import styled from 'styled-components'
import './GameCard.scss'

const StyledCard = styled.div`
  margin: 7px;
  width: calc(180px - 2vw);
  @media (max-width: 768px) {
    width: calc(180px - 8vw);
  }

  overflow: hidden;
  position:relative;
  box-shadow: 0 5px 10px rgb(0 0 0 / 80%);
  transform-origin: center top;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: 0.3s;
  &:hover {
    box-shadow 0 8px 16px 3px rgba( #000, .6 );
    transform translateY( -3px ) scale( 1.05 );

  }
  & > img{
    width:100%;
    min-height:100%;
  }
  &:hover > figcaption{
    transform:translateY(0px);
  }
`
const StyledName = styled.figcaption`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  transition:0.28s;
  text-shadow: 1px 1px 2px black;
  padding-bottom 10px;

  margin-left:5px;
  
  transform:translateY(200px);
`
export default function GameCardPlaceholder() {
  return (
    <>
      <StyledCard className={'h-48 loading-Game '}>
        <StyledName></StyledName>
      </StyledCard>
    </>
  )
}
