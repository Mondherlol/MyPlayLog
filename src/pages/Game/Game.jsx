import { useParams, useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import './Game.css'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/Atoms'
import GameTabs from '../../components/GameTabs/GameTabs'
import GameInteraction from '../../components/Game/GameInteraction/GameInteraction'
import HowLongToBeat from '../../components/Game/HowLongToBeat/HowLongToBeat'
import BackgroundImage from '../../components/Game/GameBackgroundImage/GameBackgroundImage'
import GameCover from '../../components/Game/GameCover/GameCover'
import GameMedia from '../../components/Game/GameMedia/GameMedia'
import RatingCircle from '../../components/Game/RatingCircle/RatingCircle'
import ErrorOccured from '../../components/ErrorOccured/ErrorOccured'

const GamePageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 100%;
  height: fit-content;
  position: relative;
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`

const GameWrapper = styled.div`
  max-width: 1900px;
  width: 100%;
  margin: 0;
  animation: 0.8s ease-out 0s 1 slideFromBottom;
  margin-top: 40vh;
  position: relative;
  box-shadow: 0px -5px 25px black;
  height: fit-content;

  z-index: 5;

  border-radius: 53px 53px 0px 0px;
  background-color: ${colors.background};
`
const GameContainer = styled.div`
  position: relative;
  top: -25vh;
  margin: 0;
  width: 100%;

  display: flex;
  gap: 5px;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
`
const LeftSection = styled.div``
const RightSection = styled.div`
  max-width: 100%;
  min-width: 300px;
`
const TopSection = styled.div`
  height: 28vh;
`

const GameTitle = styled.h1`
  width: 100%;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 2px black;
  font-weight: 800;

  font-size: ${(props) => {
    const baseSize =
      props.textLength > 110 ? '1vw + 1vh + 1vmin' : '2vw + 1vh + 1vmin'
    return `max(20px, ${baseSize})`
  }};
`
const ReleaseDate = styled.h2`
  color: white;

  margin-top: 10px;
  font-weight: 400;
  font-size: calc(max(15px, 0.8vw + 0.8vh + 1vmin)) !important;
  min-height: 15px;
  @media (min-width: 700px) {
    width: fit-content;
    background-color: #0000005c;
  }
`
const GameRatings = styled.div``

const Devlopper = styled.h1`
  margin-top: 1vh;
  font-weight: 600;
  font-size: 18px;
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px;
  font-weight: 600;
  opacity: 0.8;
`

function GamePage() {
  const { slug } = useParams()

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [game, setGame] = useState({})
  const [gameTitle, setGameTitle] = useState('')
  const [frenchTitle, setFrenchTitle] = useState('')
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_IP_ADRESS}/api/games/game/${slug}`)
      .then((res) => {
        if (res.data.length === 0) navigate('/404')
        else if (res.data[0].version_parent)
          navigate('/game/' + res.data[0].version_parent.slug)
        else {
          setGame(res.data[0])
          setGameTitle(res.data[0].name)
          if (res.data[0].alternative_names) {
            const french = res.data[0].alternative_names.find(
              (altName) => altName.comment === 'French title'
            )

            if (french !== undefined) setFrenchTitle(french.name)
            else setFrenchTitle(res.data[0].name)
          } else setFrenchTitle(res.data[0].name)

          setLoading(false)
        }
      })
      .catch((err) => {
        setError(true)
        console.log(err)
        setLoading(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    if (i18next.language === 'en') document.title = gameTitle + ' - My PlayLog'
    else document.title = frenchTitle + ' - My PlayLog'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTitle, frenchTitle, i18next.language])

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
  return (
    <GamePageWrapper>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : isError ? (
        <ErrorOccured />
      ) : (
        <Suspense>
          <BackgroundImage
            artworks={game.artworks}
            screenshots={game.screenshots}
          />
          <GameWrapper>
            <GameContainer>
              <GameTitle
                className="show-on-mobile"
                textLength={game.name.length}
              >
                {i18next.language === 'fr' ? frenchTitle : gameTitle} (
                {game.first_release_date &&
                  new Date(game.first_release_date * 1000).getFullYear()}
                )
              </GameTitle>

              <LeftSection className="flex flex-wrap justify-top flex-col w-fit items-center">
                <GameCover cover={game.cover} />

                <div className="  w-full  h-24">
                  <GameInteraction gameId={game.id} />
                </div>

                <div className="flex  justify-center items-center gap-4 mb-2 ratings-mobile ">
                  {game.rating && (
                    <div className="flex flex-col justify-center items-center  ">
                      <h3>{t('players_ratings')}</h3>
                      <GameRatings className=" w-32">
                        <RatingCircle
                          rating={game.rating}
                          rating_count={game.rating_count}
                        />
                      </GameRatings>
                      <span>
                        {t('based_on')}{' '}
                        <strong style={{ color: colors.primary }}>
                          {' '}
                          {game.rating_count}{' '}
                        </strong>
                        {t('players')}
                      </span>
                    </div>
                  )}

                  {game.aggregated_rating && (
                    <div className="flex flex-col justify-center items-center">
                      <h3>{t('critic_ratings')}</h3>
                      <GameRatings className=" w-32">
                        <RatingCircle
                          rating={game.aggregated_rating}
                          rating_count={Math.round(
                            game.aggregated_rating_count
                          )}
                          slug={game.slug}
                        />
                      </GameRatings>
                      <span>
                        {t('based_on')}{' '}
                        <strong style={{ color: colors.primary }}>
                          {Math.round(game.aggregated_rating_count)}{' '}
                        </strong>
                        {t('critics')}
                      </span>
                    </div>
                  )}
                </div>

                {(game.parent_game ||
                  (game.first_release_date &&
                    new Date(game.first_release_date * 1000) - new Date() <
                      0)) && (
                  <div style={{ minWidth: 260 }} className=" h-24">
                    <HowLongToBeat
                      gameName={game.name}
                      parentGameName={
                        game.parent_game ? game.parent_game.name : null
                      }
                    />
                  </div>
                )}
                <div className="hide-on-mobile">
                  <GameMedia game={game} />
                </div>
              </LeftSection>

              <RightSection className="flex-1 h-full">
                <TopSection className="flex flex-wrap justify-top align-middle flex-col relative  hide-on-mobile">
                  <GameTitle textLength={game.name.length}>
                    {i18next.language === 'fr' ? frenchTitle : gameTitle}
                  </GameTitle>
                  <ReleaseDate> {getReleaseDate()}</ReleaseDate>
                  <div className="flex">
                    {game.involved_companies && (
                      <Devlopper>
                        {game.involved_companies.map((company) => {
                          return company.developer ? company.company.name : ''
                        })}
                      </Devlopper>
                    )}
                  </div>
                  <div className="w-fit flex absolute gap-1 -bottom-2 justify-end items-end right-12 ratings-desktop">
                    {game.rating && (
                      <GameRatings className="w-28  ">
                        <RatingCircle
                          rating={game.rating}
                          rating_count={Math.round(game.rating_count)}
                        />
                      </GameRatings>
                    )}
                    {game.aggregated_rating && (
                      <GameRatings className="w-32   ">
                        <RatingCircle
                          rating={game.aggregated_rating}
                          rating_count={Math.round(
                            game.aggregated_rating_count
                          )}
                          slug={game.slug}
                        />
                      </GameRatings>
                    )}
                  </div>
                </TopSection>
                <GameTabs game={game}></GameTabs>
              </RightSection>
              <div className="show-on-mobile">
                <GameMedia game={game} />
              </div>
            </GameContainer>
          </GameWrapper>
        </Suspense>
      )}
    </GamePageWrapper>
  )
}
export default GamePage
