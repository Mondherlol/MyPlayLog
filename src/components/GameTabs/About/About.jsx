import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import ShowMoreText from 'react-show-more-text'

import Platforms from '../../Game/Platforms/Platforms'
import LanguageSupport from './LanguageSupport/LanguageSupport'
import colors from '../../../utils/style/colors'
import './About.css'
import ReleaseDates from '../../Game/ReleaseDates/ReleaseDates'
import RelatedContent from '../../RelatedContent/RelatedContent'
import GameVideos from '../../Game/GameVideos/GameVideos'

const AboutContainer = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
`
const Summary = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  overflow: hidden;
  position: relative;
`
const StyledTr = styled.tr``
const StyledTh = styled.th`
  font-size: 16px;
  border-radius: 8px 0px 0px 8px;
  padding: 7px;
  padding-left: 20px;
`
const StyledLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const StyledTd = styled.td`
  border-radius: 0px 8px 8px 0px;
  padding: 5px;
  font-weight: &;
  font-size: 16px;
`
const StyledButton = styled.button`
  padding: 10px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  width: fit-content;
  height: fit-content;
  background: ${colors.backgroundDerivation};
  border-radius: 16px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 5px ${colors.backgroundDerivation};
  transition: 0.2s;
  &:hover {
    background: ${colors.danger};
    transform: scale(1.1);
  }
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 1.8rem;
  max-height: 2.4em;
  letter-spacing: 0.00735em;
  width: fit-content;
  margin-left: 30px;
  &:before {
    background: ${colors.primary};
    content: '';
    margin-left: -0.75rem;
    align-self: flex-start;
    position: absolute;
    height: 100%;
    width: 6px;
    border-radius: 16px;
  }
`
// const GameVideos = styled.div``
function AboutGame({ game }) {
  const [showSpoiler, setShowSpoiler] = useState(false)

  const trs = document.querySelectorAll('.info-line')
  for (let i = 0; i < trs.length; i++) {
    if (i % 2 === 1) {
      trs[i].classList.add('customized-bg')
    }
  }

  const { t } = useTranslation()
  return (
    <AboutContainer>
      {game.parent_game ? (
        <h3 className="mb-2">
          {t('this_game_is') + ' ' + t('category_' + game.category) + ' '}
          {game.category === 1 ? t('for') : t('of')}
          <Link to={'/game/' + game.parent_game.slug}>
            {' '}
            {game.parent_game.name}
          </Link>
        </h3>
      ) : null}

      {game.summary && (
        <Summary>
          <ShowMoreText
            /* Default options */
            lines={3}
            more={t('show_more')}
            less={t('show_less')}
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={'... '}
          >
            {game.summary.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
          </ShowMoreText>
        </Summary>
      )}
      {game.videos && <GameVideos videos={game.videos} />}
      <div className=" flex justify-center ">
        <table
          style={{ borderCollapse: 'collapse' }}
          className="mt-2 game-info"
        >
          <tbody>
            {game.platforms && (
              <StyledTr className="info-line">
                <StyledTh>{t('platforms')} :</StyledTh>

                <StyledTd>
                  <Platforms platforms={game.platforms} />
                </StyledTd>
              </StyledTr>
            )}

            {/* GAME GENRE */}
            {game.genres && (
              <StyledTr className="info-line">
                <StyledTh>Genre :</StyledTh>
                <StyledTd>
                  {game.genres.map((genre, index) => {
                    return (
                      <Fragment key={genre.slug}>
                        <StyledLink to={`/search?genres=${genre.id}`}>
                          {t(genre.slug)}
                        </StyledLink>
                        {index < game.genres.length - 1 && <span>, </span>}
                      </Fragment>
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}

            {/* GAME DEVLOPPERS */}
            {game.involved_companies && (
              <StyledTr className="info-line">
                <StyledTh>{t('devloppers')} :</StyledTh>
                <StyledTd>
                  {game.involved_companies.map((involved) => {
                    return involved.developer ? (
                      <span key={involved.company.id}>
                        {involved.company.name} <br />
                      </span>
                    ) : (
                      ''
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}

            {/* GAME THEMES */}
            {game.themes && (
              <StyledTr className="info-line">
                <StyledTh> {t('theme')} :</StyledTh>
                <StyledTd>
                  {game.themes.map((theme, index) => {
                    return (
                      <Fragment key={theme.slug}>
                        <StyledLink to={`/search?themes=${theme.id}`}>
                          {t(theme.slug)}
                        </StyledLink>
                        {index < game.themes.length - 1 && <span>, </span>}
                      </Fragment>
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}

            {/* GAME PUBLISHERS */}
            {game.involved_companies && (
              <StyledTr className="info-line">
                <StyledTh>{t('publishers')} :</StyledTh>
                <StyledTd>
                  {game.involved_companies.map((involved) => {
                    return involved.publisher ? (
                      <span key={involved.company.id}>
                        {involved.company.name}
                        <br />
                      </span>
                    ) : (
                      ''
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}
            {game.game_modes && (
              <StyledTr className="info-line">
                <StyledTh>{t('game_modes')} : </StyledTh>
                <StyledTd>
                  {game.game_modes.map((mode, index) => {
                    return (
                      <Fragment key={mode.slug}>
                        <StyledLink>{t(mode.slug)}</StyledLink>
                        {index < game.game_modes.length - 1 && <span>, </span>}
                      </Fragment>
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}
            {game.player_perspectives && (
              <StyledTr className="info-line">
                <StyledTh>{t('player_perspectives')} :</StyledTh>
                <StyledTd>
                  {game.player_perspectives.map((perspective, index) => {
                    return (
                      <Fragment key={perspective.slug}>
                        <span>{t(perspective.slug)}</span>
                        {index < game.player_perspectives.length - 1 && (
                          <span>, </span>
                        )}
                      </Fragment>
                    )
                  })}
                </StyledTd>
              </StyledTr>
            )}
          </tbody>
        </table>
      </div>
      {game.release_dates && <ReleaseDates releaseDates={game.release_dates} />}
      {game.language_supports && (
        <div>
          {game.language_supports && (
            <LanguageSupport language_supports={game.language_supports} />
          )}
        </div>
      )}

      {/* GAME STORYLINE */}
      {game.storyline && (
        <div className="relative mt-6">
          <Title>{t('storyline')}</Title>
        </div>
      )}
      {game.storyline && (
        <Summary className="mt-2 ml-4">
          <div className={`spoiler-content ${showSpoiler ? 'reveal' : ''}`}>
            <ShowMoreText
              lines={3}
              more={t('show_more')}
              less={t('show_less')}
              anchorClass="show-more-less-clickable"
              expanded={false}
              truncatedEndingComponent={'... '}
            >
              {game.storyline.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </ShowMoreText>
          </div>
          {!showSpoiler && (
            <StyledButton
              onClick={() => {
                setShowSpoiler(!showSpoiler)
              }}
            >
              {t('show').toUpperCase()}
            </StyledButton>
          )}
        </Summary>
      )}

      <RelatedContent game={game} />
      {/* {game.videos && <YoutubeEmbed embedId={game.videos[0].video_id} />} */}
    </AboutContainer>
  )
}

export default AboutGame
