import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import i18next from 'i18next'
import colors from '../../../utils/style/colors'
import UserLists from '../UserLists/UserLists'
import UserOverview from './Tabs/UserOverview/UserOverview'

const TabsContainer = styled.div`
  height: fit-content;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 1.4px;
    border-radius: 15px;
    background-color: grey;
  }
`
const TabsList = styled.ul`
  padding-left: 25px;

  list-style: none;
  display: flex;
  position: relative;
  width: fit-content;
  &:after {
    transition: 0.5s;
    content: '';
    z-index: 1;
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
  cursor: pointer;
  background: none;
  transition: 0.2s;
  border: none;
  color: ${(props) => (props.active ? colors.primary : 'white')};
`

function UserTabs({ user, userLists }) {
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
    <>
      <TabsContainer>
        <TabsList
          activeTabLeft={tabStyles.activeTabLeft}
          activeTabWidth={tabStyles.activeTabWidth}
        >
          <Tab
            ref={(el) => (tabsRef.current[0] = el)}
            onClick={() => setActiveTabIndex(0)}
            active={activeTabIndex === 0}
          >
            {t('overview')}
          </Tab>
          <Tab
            ref={(el) => (tabsRef.current[1] = el)}
            onClick={() => setActiveTabIndex(1)}
            active={activeTabIndex === 1}
          >
            {t('lists')}
          </Tab>
          <Tab
            ref={(el) => (tabsRef.current[2] = el)}
            onClick={() => setActiveTabIndex(2)}
            active={activeTabIndex === 2}
          >
            Statistiques
          </Tab>
        </TabsList>
      </TabsContainer>
      <div className=" w-full h-fit mt-2">
        {activeTabIndex === 0 && (
          <UserOverview
            user={user}
            userLists={userLists}
            setActiveTabIndex={setActiveTabIndex}
          />
        )}
        {activeTabIndex === 1 && (
          <UserLists userId={user._id} username={user.username} />
        )}
      </div>
    </>
  )
}

export default UserTabs
