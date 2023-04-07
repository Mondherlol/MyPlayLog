import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import './GameTabs.css'
import AboutGame from './About/About'
import i18next from 'i18next'

const TabsContainer = styled.div`
  height: fit-content;
`
const TabsList = styled.ul`
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
}

  &:after {
    transition: 0.5s;
    content: '';
    position: absolute;
    width: calc(
      ${(props) => props.activeTabWidth}px
    ); /* utilise la largeur de l'onglet actif */
    height: 5px;
    bottom: 0;
    left: ${(props) =>
      props.activeTabLeft}px; /* utilise la largeur de l'onglet actif */
    border-radius: 15px;
    background-color: #fdc500;
  }
`

const Tab = styled.button`
  position: relative;
  margin: 12px;
  font-weight: 800;
  font-size: calc(20px - 25%);
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  background: none;
  transition: 0.2s;
  border: none;
`

function GameTabs({ game }) {
  const { t } = useTranslation()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tabsRef = useRef([])
  const [tabStyles, setTabStyles] = useState({
    activeTabLeft: 0,
    activeTabWidth: 0,
  })

  useEffect(() => {
    // met à jour la position de l'onglet actif et la largeur du before lorsque l'onglet actif ou la langue changent
    const activeTab = tabsRef.current[activeTabIndex]
    const activeTabWidth = activeTab.offsetWidth
    const activeTabLeft = activeTab.offsetLeft
    setTabStyles({ activeTabLeft, activeTabWidth })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex, i18next.language])

  return (
    <TabsContainer>
      <TabsList
        activeTabLeft={tabStyles.activeTabLeft}
        activeTabWidth={tabStyles.activeTabWidth}
      >
        <Tab
          ref={(el) => (tabsRef.current[0] = el)}
          onClick={() => setActiveTabIndex(0)}
          className={activeTabIndex === 0 ? 'tab_active' : ''}
        >
          {t('about')}
        </Tab>
        <Tab
          ref={(el) => (tabsRef.current[1] = el)}
          onClick={() => setActiveTabIndex(1)}
          className={activeTabIndex === 1 ? 'tab_active' : ''}
        >
          {t('reviews')}
        </Tab>
        <Tab
          ref={(el) => (tabsRef.current[2] = el)}
          onClick={() => setActiveTabIndex(2)}
          className={activeTabIndex === 2 ? 'tab_active' : ''}
        >
          {t('achievements')}
        </Tab>
      </TabsList>
      <div className=" w-full h-fit mt-3">
        {activeTabIndex === 0 && <AboutGame game={game} />}
      </div>
    </TabsContainer>
  )
}

export default GameTabs
