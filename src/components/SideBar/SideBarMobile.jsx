import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import axios from 'axios'

import { LoginContext, LoginData } from '../../Helper/Context'
import colors from '../../utils/style/colors'
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
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const { loginData, setLoginData } = useContext(LoginData)
  const navigate = useNavigate()

  const Logout = () => {
    axios({
      method: 'post',
      data: {},
      withCredentials: true,
      url: `${process.env.REACT_APP_IP_ADRESS}/api/user/logout`,
    }).then((res) => {
      console.log(res)
      if (res.data.message === 'User logged out') {
        setLoggedIn(false)
        setLoginData(null)
        setShowSidebar(false)
        navigate('/')
      }
    })
  }
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
      <div
        ref={nodeRef}
        className={`sidebarMenu ${
          showSidebar ? '' : 'show'
        } flex flex-col justify-between `}
      >
        <div>
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
              <Link
                onClick={closeSidebar}
                to={loginData ? `/user/${loginData._id}` : '/login'}
              >
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
          </SideBardiv2>
        </div>
        <div className="mb-4">
          {loggedIn && (
            <div>
              <div
                className="relative  ml-4 w-full flex justify-center flex-row items-center h-10 rounded-full   cursor-pointer"
                style={{ backgroundColor: 'transparent' }}
              >
                <Link to={`/user/${loginData._id}`} onClick={closeSidebar}>
                  <div
                    className="absolute top-0 left-0 w-11 h-11 rounded-full  shadow-md flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <img
                      src={loginData ? loginData.profilePic : ''}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="absolute top-0 left-14 w-fit h-10 flex items-center justify-center">
                    <h2 className="text-white text-sm text-bold truncate">
                      {loginData.username}{' '}
                    </h2>
                  </div>
                </Link>
              </div>
              <SideBarBtn onClick={() => Logout()} type="text" block>
                {' '}
                {t('log_out')}
              </SideBarBtn>
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  )
}
