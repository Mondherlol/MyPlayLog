import styled from 'styled-components'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import MyPlayLogLogo from '../../assets/myplaylog_logo_transparent_horizontal.png'
import lists from '../../assets/icons/sidebar/bookmark.png'
import home from '../../assets/icons/sidebar/domicile.png'
import explore from '../../assets/icons/sidebar/game-controller.png'
import profile from '../../assets/icons/sidebar/avatar.png'
import colors from '../../utils/style/colors'
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

  font-size: calc(7px + 0.5vw);

  margin: 1.2vh;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
`
const iconStyle = {
  marginRight: '2vh',
}

const SideBarBtn = styled(Button)`
  color: rgb(255, 255, 255, 0.6);
  text-align: left;
  font-size: calc(7px + 0.5vw);
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

export default function SideBar({ currentLanguage, setLanguage }) {
  const { t } = useTranslation()

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          color: colors.primary,
          fontSize: 'calc(20px + 0.5vw)',
          margin: '3vh auto',
          marginBottom: '4vh',
        }}
      >
        <Link to="/" style={{ color: colors.primary }}>
          {/* MyPlayLog */}
          <img
            style={{ width: '87%' }}
            src={MyPlayLogLogo}
            alt="my-play-log-logo"
          />
        </Link>
      </h1>

      <SideBardiv>
        <SideBarBtn2 type="text" block>
          <Link to="/">
            {' '}
            <img src={home} width="18vh" style={iconStyle} alt="" /> {t('home')}
          </Link>
        </SideBarBtn2>

        <SideBarBtn2 type="text" block>
          <Link to="/search">
            <img src={explore} width="18vh" style={iconStyle} alt="" />
            {t('explore')}
          </Link>
        </SideBarBtn2>
        <SideBarBtn2 type="text" block>
          <Link to="/lists">
            <img src={lists} width="18vh" style={iconStyle} alt="" />{' '}
            {t('lists')}
          </Link>
        </SideBarBtn2>
        <SideBarBtn2 type="text" block>
          <Link to="/">
            <img src={profile} width="18vh" style={iconStyle} alt="" />{' '}
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
    </>
  )
}
