import { useState } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTranslation } from 'react-i18next'
import RelatedGame from './RelatedGame/RelatedGame'

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
const ContentWrapper = styled.div`
  @media (min-width: 750px) {
    margin-left: 15px;
  }
`
const StyledTab = styled.button`
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: none;
  padding: 5px;
  text-shadow: 1px 1px 2px black;

  border-bottom: none;
  border-radius: 8px 8px 0 0;
  &:hover {
    background: black;
  }
  &.active-tab {
    color: ${colors.primary};
    background: ${colors.backgroundDerivation};
  }
`
const Container = styled.div`
  background: ${colors.backgroundDerivation};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 5px 5px 15px black;
  width: 100%;
`

const GamesContainer = styled.div`
  @media (max-width: 950px) {
    overflow-x: auto; // Permettre le défilement horizontal si les éléments dépassent la largeur de l'écran
    flex-wrap: nowrap; // Empêcher l'enveloppement des éléments
  }
  flex-wrap: wrap;
  padding-left: 15px;
  max-width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  background: ${colors.backgroundDerivation};
`
function RelatedContent({ game }) {
  const { t } = useTranslation()
  const [selectedTabs, setSelectedTabs] = useState(0)
  const Content = [
    game.parent_game,
    game.expanded_games,
    game.standalone_expansions,
    game.remakes,
    game.remasters,
    game.dlcs,
    game.ports,
    game.expansions,
  ].filter((item) => item !== undefined)
  if (Content.length === 0) return <span />

  // Tableau des onglets à afficher, en vérifiant la présence des données correspondantes
  const Tabs = [
    game.parent_game ? t('original_game') : null,
    game.expanded_games && game.expanded_games.length > 0
      ? t('expanded_games')
      : null,
    game.standalone_expansions && game.standalone_expansions.length > 0
      ? t('standalones')
      : null,
    game.remakes && game.remakes.length > 0 ? t('remakes') : null,
    game.remasters && game.remasters.length > 0 ? t('remasters') : null,
    game.dlcs && game.dlcs.length > 0 ? t('dlcs') : null,
    game.ports && game.ports.length > 0 ? t('ports') : null,
    game.expansions && game.expansions.length > 0 ? t('expansions') : null,
  ]

  // Filtrer les onglets non null
  const tabsToShow = Tabs.filter((tab) => tab !== null)

  function handleClick(index) {
    setSelectedTabs(index)
    console.log(index)
  }

  return (
    <div className="flex flex-col w-full  ">
      <div className="relative mt-6 mb-4">
        <Title>{t('related_content')}</Title>
      </div>
      <ContentWrapper>
        <div className="flex  flex-nowrap overflow-x-auto">
          {tabsToShow.map((tab, index) => (
            <StyledTab
              className={` text-sm p-6 whitespace-nowrap ${
                selectedTabs === index ? 'active-tab' : ''
              } `}
              key={index}
              onClick={() => handleClick(index)}
            >
              {tab}
              {tab !== t('original_game') && ' (' + Content[index].length + ')'}
            </StyledTab>
          ))}
        </div>
        <Container>
          <GamesContainer className=" flex w-full items-center  ">
            {
              // If actual game is parent game, interact with it directly
              tabsToShow[selectedTabs] === t('original_game') ? (
                <RelatedGame game={Content[selectedTabs]} />
              ) : (
                //Else iterate with all of the games in it
                Content[selectedTabs].map((g) => {
                  return <RelatedGame key={g.slug} game={g} />
                })
              )
            }
          </GamesContainer>
        </Container>
      </ContentWrapper>
    </div>
  )
}

export default RelatedContent
