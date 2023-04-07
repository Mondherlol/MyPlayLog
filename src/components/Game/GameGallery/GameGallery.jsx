import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import Carousel from 'better-react-carousel'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

import { useState } from 'react'

import './GameGallery.css'
import YellowRightArrowIcon from '../../../assets/icons/yellow-right-arrow.png'

const GalleryContainer = styled.div`
  width: 350px;
  @media (max-width: 650px) {
    width: 100%;
  }
`
const ImageCarousel = styled.img`
  object-fit: cover;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`
const moveArrow = keyframes`

10% {  transform: scale(1.1);
    transform: translateX(5px);
}
20% {  transform: scale(1);
    transform: translateX(0px);}
`

const CarouselArrow = styled.img`
  &:hover {
    animation-name: ${moveArrow};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
`
const CarouselLeftArrow = styled.img`
  transform: rotate(180deg);
`
function GameGallery({ images }) {
  const [open, setOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const slides = images.map((image) => ({
    src: `https://images.igdb.com/igdb/image/upload/t_1080p/${image.image_id}.jpg`,
  }))

  return (
    <GalleryContainer>
      <Carousel
        cols={slides.length > 1 ? 2 : 1}
        rows={slides.length > 2 ? 2 : 1}
        gap={10}
        arrowRight={
          slides.length > 4 ? (
            <span
              type="next"
              style={{ height: 35, width: 35 }}
              className=" absolute flex  justify-center items-center  right-0 top-0 bottom-0 my-auto   cursor-pointer bg-white  bg-opacity-25  z-40 rounded-full hover:bg-opacity-50  "
            >
              <CarouselArrow
                height={25}
                width={25}
                className="icon "
                src={YellowRightArrowIcon}
              />
            </span>
          ) : (
            <span className=" hidden "></span>
          )
        }
        arrowLeft={
          slides.length > 4 ? (
            <span
              type="next"
              style={{ height: 35, width: 35 }}
              className=" absolute flex  justify-center items-center  left-0 top-0 bottom-0 my-auto   cursor-pointer  bg-white  bg-opacity-25  z-40 rounded-full hover:bg-opacity-50 "
            >
              <CarouselLeftArrow
                height={25}
                width={25}
                className="rotate-80"
                src={YellowRightArrowIcon}
              />
            </span>
          ) : (
            <span className=" hidden "></span>
          )
        }
        loop
      >
        {images.map((image, index) => {
          return (
            <Carousel.Item key={image.image_id}>
              <div className=" overflow-hidden rounded-lg flex justify-center items-center image-gallery  loading ">
                <ImageCarousel
                  draggable="false"
                  width="100%"
                  height="100%"
                  alt={image.image_id}
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${image.image_id}.jpg`}
                  onClick={() => {
                    setImageIndex(index)
                    setOpen(true)
                  }}
                />
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>

      <Lightbox
        index={imageIndex}
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        carousel={'2'}
        plugins={[Zoom, Fullscreen, Thumbnails]}
        thumbnails={{
          position: 'bottom',
          gap: 5,
          border: 0,
          imageFit: 'cover',
        }}
      />
    </GalleryContainer>
  )
}

export default GameGallery
