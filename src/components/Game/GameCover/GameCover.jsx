import styled from 'styled-components'
import { useProgressiveImage } from '../../../utils/hooks/Hooks'
const CoverImage = styled.img`
  float: left;
  object-fit: cover;
  box-shadow: 6px 3px 37px -6px rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  width: calc(220px);
  display: block;
  max-width: 220px;
  max-height: 290px;

  width: 220px;
  height: 290px;

  @media (max-width: 700px) {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`

function GameCover({ cover }) {
  const defaulCover =
    'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png'
  const loadedCover = useProgressiveImage(
    cover
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`
      : defaulCover
  )

  return (
    <CoverImage
      //   style={!loadedCover ? { height: 290, width: 220 } : null}
      className={!loadedCover ? 'loading' : null}
      draggable="false"
      src={loadedCover}
    />
  )
}

export default GameCover
