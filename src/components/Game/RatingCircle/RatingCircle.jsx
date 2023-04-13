import { useState, useEffect } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import colors from '../../../utils/style/colors'
import ProgressProvider from './ProgressProvider'
import 'react-circular-progressbar/dist/styles.css'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const RatingContainer = styled.div`
  background: ${colors.background};
  padding: 8px;
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;
  // box-shadow: 2px 2px 10px black;

  &:hover {
    box-shadow: 5px 5px 10px black;

    transform: scale(1.2);
  }
`

const RatingContent = styled.div``

const RatingPercentage = styled.div`
  font-size: 240%;
  font-weight: 700;
`
const About = styled.div`
  background: ${colors.background};
  display: none;
  position: absolute;
  top: -68px;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: 100px;
  text-align: center;
  height: 50px;
  transition: opacity 0.2s ease-in-out;
  box-shadow: 5px 5px 10px black;

  opacity: 0;
  padding: 8px;
  border-radius: 8px;
  color: white;
  & strong {
    color: ${colors.primary};
  }
`

const Container = styled.div`
  position: relative;
  z-index: 95;
  &:hover ${About} {
    display: block;
    opacity: 1;
  }
`

function RatingCircle({ rating, rating_count, slug }) {
  rating = Math.round(rating)
  let color =
    rating > 75
      ? colors.favorable
      : rating > 50
      ? colors.average
      : colors.unfavorable

  // const [animatedRating, setAnimatedRating] = useState(0)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (animatedRating < rating) {
  //       setAnimatedRating(Math.min(animatedRating + 2, rating))
  //     }
  //   }, 30)

  //   return () => clearInterval(intervalId)
  // }, [rating, animatedRating])

  const { t } = useTranslation()
  return (
    <Container
      onClick={() => {
        if (slug !== undefined)
          window.open(`https://www.igdb.com/games/${slug}/reviews`)
      }}
    >
      <About>
        {t('based_on')} <strong>{rating_count}</strong>{' '}
        {slug !== undefined ? t('critics') : t('players')}
      </About>
      <RatingContainer>
        <ProgressProvider valueStart={0} valueEnd={rating}>
          {(value) => (
            <CircularProgressbarWithChildren
              value={value}
              circleRatio={0.75}
              styles={buildStyles({
                pathTransitionDuration: 3,
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                pathColor: color,
                textSize: 'calc( 240% )',
              })}
            >
              <RatingContent>
                <RatingPercentage>
                  {value !== 0 && <span>{Math.round(rating)}</span>}%
                </RatingPercentage>
              </RatingContent>
            </CircularProgressbarWithChildren>
          )}
        </ProgressProvider>
      </RatingContainer>
    </Container>
  )
}

export default RatingCircle
