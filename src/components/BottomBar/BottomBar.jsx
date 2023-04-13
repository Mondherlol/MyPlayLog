import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'

import { LoginContext, LoginData } from '../../Helper/Context'
import colors from '../../utils/style/colors'
import Home from '../../assets/icons/sidebar/domicile.png'
import Login from '../../assets/icons/bottombar/login.png'
import Signup from '../../assets/icons/bottombar/signup.png'
import explore from '../../assets/icons/sidebar/game-controller.png'
import lists from '../../assets/icons/sidebar/bookmark.png'

const BottomBarWrapper = styled.div`
  min-width: 320px;
  z-index: 555;
  background-color: black;
  width: 100%;
  height: 60px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 560px) {
    display: none;
  }
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  text-align: center;
  text-decoration: none;

  .icon {
    margin-bottom: 5px;
    height: 24px;
  }

  &:hover {
    color: ${colors.primary};
  }
`

function BottomBar() {
  const { t } = useTranslation()
  const { loggedIn } = useContext(LoginContext)

  return (
    <BottomBarWrapper>
      <StyledLink to="/">
        <img className="icon" src={Home} alt="Home Icon" />
        <div>{t('home')}</div>
      </StyledLink>
      {!loggedIn ? (
        <>
          <StyledLink to="/login">
            <img className="icon" src={Login} alt="Login Icon" />
            <div>{t('login')}</div>
          </StyledLink>
          <StyledLink to="/signup">
            <img className="icon" src={Signup} alt="Signup Icon" />
            <div>{t('sign_up')}</div>
          </StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/search">
            <img className="icon" src={explore} alt="Explore Icon" />
            <div>{t('explore')}</div>
          </StyledLink>
          <StyledLink to="/lists">
            <img className="icon" src={lists} alt="List Icon" />
            <div>{t('lists')}</div>
          </StyledLink>
        </>
      )}
    </BottomBarWrapper>
  )
}

export default BottomBar
