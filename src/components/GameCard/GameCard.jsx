import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import i18next from 'i18next'

import MyPlayLogIcon from '../../assets/LOGO_placeholder.png'
import './GameCard.scss'
import colors from '../../utils/style/colors'
import { useTranslation } from 'react-i18next'

import saveIcon from '../../assets/icons/interactions/save.png'
import AddingGameModal from '../ListComponents/AddingGameModal/AddingGameModal'

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
  ${({ show }) => !show && 'transform:translateY(200px);'}
  margin-left:5px;

`
const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${colors.primary};
  font-size: 3vh;
  width: 35px;
  border: 2px solid ${colors.primary};
  height: 35px;
  top: 13px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
    border: 2px solid white;
  }
  right: 13px;
  background-color: rgb(8, 7, 27, 0.7);
  border-radius: 12px;
`

const InfoSection = styled.section`
  opacity: 0;
  position: absolute;
  top: 0px;
  width: 200px;
  left: 0%;
  z-index: -1;
  height: fit-content;
  background: rgb(8, 7, 27);
  color: white !important;
  box-shadow: 0 8px 16px 3px rgba(#000, 0.6);
  transition: 0.5s;
  filter: blur(4px);

  &.over {
    filter: blur(0px);
    opacity: 1;
    transform: translateX(
      ${({ enoughSpace }) => (enoughSpace ? '90%' : '-105%')}
    );
    z-index: 1;
  }
`

export default function GameCard({ game }) {
  const { t } = useTranslation()
  const cardRef = useRef(null)
  const [isOver, setIsOver] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [enoughSpace, setEnoughSpace] = useState(true)
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  var url = game.cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
    : MyPlayLogIcon
  const getImage = (screenshot) => {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${
      screenshot ? screenshot.image_id : 'undefined'
    }.jpg`
  }

  useEffect(() => {
    if (!isMobile) {
      let timerId
      function handleMouseOver() {
        timerId = setTimeout(() => {
          const cardElement = cardRef.current
          const boundingRect = cardElement.getBoundingClientRect()
          const spaceAvailableRight = window.innerWidth - boundingRect.right
          if (spaceAvailableRight < 245) setEnoughSpace(false)
          setIsOver(true)
        }, 800)
      }

      function handleMouseOut() {
        clearTimeout(timerId)
        setIsOver(false)
      }

      const cardElement = cardRef.current
      cardElement.addEventListener('mouseover', handleMouseOver)
      cardElement.addEventListener('mouseout', handleMouseOut)

      return () => {
        cardElement.removeEventListener('mouseover', handleMouseOver)
        cardElement.removeEventListener('mouseout', handleMouseOut)
        clearTimeout(timerId)
      }
    }
  }, [isMobile])

  const getReleaseDate = () => {
    if (game.release_dates && game.release_dates[0].human === 'TBD')
      return 'TBD'
    // Vérifie si on connaît que l'année de sortie.
    const onlyYear =
      game.first_release_date && /^\d{4}$/.test(game.release_dates[0].human)

    // Si la date contient uniquement l'année, on renvoie seulement l'année pour laquelle c'est prévu.
    if (onlyYear) {
      const year = game.release_dates[0].human
      const currentYear = new Date().getFullYear()
      if (year > currentYear) {
        return t('scheduled_for') + ' ' + year + '.'
      } else return year
    }

    //On récupere la release Date.
    const releaseDate = game.release_dates
      ? new Date(game.first_release_date * 1000)
      : null

    //On vérifie si il existe une date sinon on renvoie date inconnue.
    if (releaseDate) {
      //La date est localisée selon la traduction de la page.
      const localisedReleaseDate = new Intl.DateTimeFormat(i18next.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(releaseDate)
      //On calcule la différence de temps entre la sortie et aujourd'hui.
      const now = new Date()
      const diff = now.getTime() - releaseDate.getTime()
      const diffInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
      const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))

      //Si le jeu est sortit avant cette année, la différence est en année.
      if (diffInYears > 0) {
        return (
          localisedReleaseDate +
          ' (' +
          new Intl.RelativeTimeFormat(i18next.language, {
            numeric: 'auto',
          }).format(-diffInYears, 'year') +
          ')'
        )
      } else {
        //Si le jeu sort / est sorti cette année, la différence est en jours.
        return (
          localisedReleaseDate +
          ' (' +
          new Intl.RelativeTimeFormat(i18next.language, {
            numeric: 'auto',
          }).format(-diffInDays, 'day') +
          ')'
        )
      }
    } else {
      return t('release_date_unknown')
    }
  }

  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0)

  useEffect(() => {
    if (!isMobile) {
      let intervalId = null

      if (isOver && game.screenshots) {
        intervalId = setInterval(() => {
          setCurrentScreenshotIndex(
            (currentScreenshotIndex + 1) % game.screenshots.length
          )
        }, 4000)
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver, currentScreenshotIndex])
  const currentScreenshot = game.screenshots
    ? game.screenshots[currentScreenshotIndex]
    : null

  return (
    <>
      <AddingGameModal
        gameId={game.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className={`relative cardGame  `} ref={cardRef}>
        <Link to={`/game/${game.slug}`} draggable="false">
          <StyledCard className={' bg-grey-500 h-48'}>
            <img draggable="false" src={url} alt={game.slug} />
            <StyledName show={game.cover ? false : true}>
              {game.name}
            </StyledName>
          </StyledCard>
        </Link>
        <AddButton
          onClick={(e) => {
            e.preventDefault()
            setIsModalOpen(true)
          }}
        >
          <img className=" w-8" src={saveIcon} alt="save-icon" />{' '}
        </AddButton>
        {!isMobile && (
          <InfoSection
            enoughSpace={enoughSpace}
            className={`info ${isOver ? 'over' : ''}`}
          >
            <div className="background"></div>
            <h4>{game.name}</h4>
            {game.screenshots && (
              <div
                className="image"
                style={{
                  background: `url(${getImage(currentScreenshot)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: ' no-repeat',
                  width: '100%',
                  height: ' 120px',
                }}
              ></div>
            )}

            <footer>
              <h5> {getReleaseDate()}</h5>

              <p>
                {game.platforms &&
                  game.platforms.map((platform, index) => {
                    const platformName = platform.abbreviation
                      ? platform.abbreviation
                      : platform.name
                    const isLastPlatform = index === game.platforms.length - 1
                    const separator = isLastPlatform ? '' : ', '
                    return (
                      <span key={platform.id}>
                        {platformName}
                        {separator}
                      </span>
                    )
                  })}
              </p>
            </footer>
          </InfoSection>
        )}
      </div>
    </>
  )
}
