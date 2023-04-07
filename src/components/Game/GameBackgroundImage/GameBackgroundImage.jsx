import styled from 'styled-components'
import { useProgressiveImage } from '../../../utils/hooks/Hooks'
const Background = styled.div`
  width: 100%;
  height: 20rem;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(6px);
  transform: scale(1.1);
  -webkit-filter: blur(6px);
  backdrop-filter: blur(2px);
  @media (min-width: 700px) {
    height: 30rem;
  }
  @media (min-width: 1500px) {
    height: 100vh;
  }
`

function BackgroundImage({ artworks, screenshots }) {
  const defaultBackgroundImage = 'https://wallpaperaccess.com/full/698524.jpg'

  const getBackgroundImage = () => {
    let backgroundImageId =
      artworks && artworks.length > 0
        ? artworks[0].image_id
        : (screenshots && screenshots.length) > 0
        ? screenshots[0].image_id
        : null
    if (backgroundImageId !== null)
      return `https://images.igdb.com/igdb/image/upload/t_1080p/${backgroundImageId}.jpg`
    else return defaultBackgroundImage
  }
  const loadedBackground = useProgressiveImage(getBackgroundImage())

  return (
    <Background
      className={
        '  bg-no-repeat bg-cover bg-top bg-hero ' +
        (loadedBackground ? '' : 'loading bg-white')
      }
      style={
        loadedBackground
          ? {
              backgroundImage: `url("${loadedBackground}")`,
            }
          : null
      }
    ></Background>
  )
}

export default BackgroundImage
