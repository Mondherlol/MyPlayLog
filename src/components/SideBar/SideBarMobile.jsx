import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'

import './SideBarMobile.css'
import toggleMenu from '../../assets/icons/navbar/hamburger.png'
import SelectLanguage from '../SelectLanguage/SelectLanguage'

const SideBardiv = styled.div`
  background-color: transparent;
  width: 100%;
  text-align: left;
`
const SideBardiv2 = styled.div`
  background-color: transparent;
  width: 100%;
  text-align: left;
`

//test css
const SideBarBtn2 = styled(Button)`
  color: rgb(255, 255, 255, 0.6);
  text-align: left;
  font-weight: bold;
  font-size: 19px;
  margin: 1.2vh;
  margin-left: 2vh;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
`

const SideBarBtn = styled(Button)`
  color: rgb(255, 255, 255, 0.6);
  text-align: left;
  font-size: 19px;
  margin: 0.9vh;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
`

const hrStyle = {
  opacity: '0.6',
  width: '75%',
  margin: 'auto',
  borderRadius: '50px',
  marginTop: '2vh',
  marginBottom: '2vh',
}

export default function SideBarMobile({ showSidebar, setShowSidebar }) {
  const { t } = useTranslation()
  const nodeRef = useRef(null)
  const closeSidebar = () => {
    setShowSidebar(false)
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={showSidebar}
      timeout={{
        enter: 1000,
        exit: 1000,
      }}
      unmountOnExit={true}
      classNames="my-node"
    >
      <div ref={nodeRef} className={`sidebarMenu ${showSidebar ? '' : 'show'}`}>
        <SideBardiv>
          <div
            className="toggleMenu"
            onClick={closeSidebar}
            style={{ marginTop: 20, marginLeft: 20 }}
          >
            <img
              src={toggleMenu}
              className="icon"
              alt="Notification-icon"
            ></img>
          </div>
          <SideBarBtn2 type="text" block>
            <Link onClick={closeSidebar} to="/">
              {' '}
              {t('home')}
            </Link>
          </SideBarBtn2>

          <SideBarBtn2 type="text" block>
            <Link onClick={closeSidebar} to="/search">
              {t('explore')}
            </Link>
          </SideBarBtn2>
          <SideBarBtn2 type="text" block>
            <Link onClick={closeSidebar} to="/lists">
              {t('lists')}
            </Link>
          </SideBarBtn2>
          <SideBarBtn2 type="text" block>
            <Link onClick={closeSidebar} to="/">
              {t('profile')}
            </Link>
          </SideBarBtn2>
        </SideBardiv>

        <SideBardiv2>
          <hr style={hrStyle}></hr>
          <SideBarBtn type="text" block>
            {' '}
            {t('settings')}
          </SideBarBtn>
          {/*LANGUAGE */}
          <SelectLanguage />

          <SideBarBtn type="text" block>
            {' '}
            {t('help')}
          </SideBarBtn>
          <SideBarBtn type="text" block>
            {' '}
            {t('log_out')}
          </SideBarBtn>
        </SideBardiv2>
      </div>
    </CSSTransition>
  )
}
