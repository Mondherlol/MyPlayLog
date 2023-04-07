import { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Carousel from 'better-react-carousel'
import styled from 'styled-components'

const GameVideosContainer = styled.div`
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 8px;
  }
`
const CurrentVideoContainer = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
  }
`
const VideosContainer = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
  }
`
const VideoContainer = styled.div`
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`
const WebCarousel = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`
const MobileCarousel = styled.div`
  @media (min-width: 1200px) {
    display: none;
  }
  height: 124px;
  width: 100%;
  gap: 5px;
  display: flex;

  /* Masquer la barre de défilement */
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-x: auto;

  &.only-two {
    justify-content: center;
  }
`
function GameVideos({ videos }) {
  const videoRefs = useRef([])
  const [currentVideo, setCurrentVideo] = useState('')

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentVideo(videos[0].video_id)
    }
  }, [videos])

  const handleReady = (index) => () => {
    const videoElement = videoRefs.current[index]
    if (videoElement) {
      videoElement.classList.remove('loading')
    }
  }

  return (
    <GameVideosContainer className=" w-full flex h-full  flex-row flex-wrap">
      <CurrentVideoContainer className=" flex-1 flex justify-center items-center   ">
        <div
          style={{
            width: '100%',
            paddingTop: '56.25%',
            position: 'relative',
          }}
        >
          {currentVideo && (
            <ReactPlayer
              previewTabIndex={5}
              light={true}
              playing={false}
              controls={true}
              muted={true}
              width="100%"
              height="100%"
              className=" game-video absolute top-0 left-0 loading "
              url={`https://www.youtube.com/watch?v=${currentVideo}`}
              config={{
                youtube: {
                  playerVars: { origin: 'https://www.youtube.com' },
                },
              }}
              ref={(player) => (videoRefs.current[0] = player?.wrapper)}
              onReady={handleReady(0)}
            />
          )}
        </div>
      </CurrentVideoContainer>

      {videos.length > 1 && (
        <VideosContainer className=" w-3/12 flex justify-center items-center ">
          <WebCarousel className="flex-1">
            <Carousel
              cols={1}
              hideArrow={videos.length > 3 ? false : true}
              rows={3}
              gap={10}
              autoplay={2000}
              loop
            >
              {videos.map((video, index) => {
                return (
                  <Carousel.Item key={index}>
                    <VideoContainer>
                      <div
                        className=" absolute w-full h-full left-0 top-0 z-10 game-video"
                        onClick={() => {
                          //change video
                          setCurrentVideo(video.video_id)
                        }}
                      ></div>
                      <ReactPlayer
                        light={true}
                        controls={true}
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0 loading"
                        url={`https://www.youtube.com/watch?v=${video.video_id}`}
                        onReady={handleReady(index)}
                        ref={(player) =>
                          (videoRefs.current[index] = player?.wrapper)
                        }
                        config={{
                          youtube: {
                            playerVars: { origin: 'https://www.youtube.com' },
                          },
                        }}
                      />
                    </VideoContainer>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </WebCarousel>
          <MobileCarousel className={videos.length > 2 ? '' : 'only-two'}>
            {videos.map((video, index) => {
              return (
                <div
                  style={{ width: '45%', minWidth: '45%' }}
                  className="relative "
                  key={video.video_id}
                >
                  <div
                    className=" absolute w-full h-full left-0 top-0 z-10  "
                    onClick={() => {
                      //change video
                      setCurrentVideo(video.video_id)
                    }}
                  ></div>
                  <ReactPlayer
                    light={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 loading game-video"
                    url={`https://www.youtube.com/watch?v=${video.video_id}`}
                    onReady={handleReady(index)}
                    ref={(player) =>
                      (videoRefs.current[index] = player?.wrapper)
                    }
                    config={{
                      youtube: {
                        playerVars: { origin: 'https://www.youtube.com' },
                      },
                    }}
                  />
                </div>
              )
            })}
          </MobileCarousel>
        </VideosContainer>
      )}
    </GameVideosContainer>
  )
}

export default GameVideos
