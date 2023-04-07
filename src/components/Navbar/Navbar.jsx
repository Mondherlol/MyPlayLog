import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import './Navbar.css'
import SearchIcon from '../../assets/icons/search.png'
import toggleMenu from '../../assets/icons/navbar/hamburger.png'
import MyPlayLogoLogo from '../../assets/myplaylog_logo_transparent_horizontal.png'
// import NotificationIcon from '../../assets/icons/navbar/notification.png'

// const MyPlayLogLogo = styled(Link)`
//   text-decoration: none;
//   color: ${colors.primary};
//   &:hover {
//     color: ${colors.primary};
//   }
// `
const StyledButton = styled(Link)`
  color: white;
`

function Navbar({ showSidebar, setShowSidebar, searchValue, setSearchValue }) {
  const handleSidebarClick = () => {
    setShowSidebar(!showSidebar)
  }
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <form
      className="navbar-form"
      onSubmit={(e) => {
        e.preventDefault()
        if(searchValue!==""){
          navigate('/search?q='+searchValue)
          navigate(0)
        }else{
          navigate('/search')
          navigate(0)
        }
        
      }}
    >
      <nav className="navbar">
        <div className="searchBar">
          <select className="searchType" defaultValue={'game'}>
            <option style={{ padding: 15 }} value="game">
              {t('game')}
            </option>
            <option value="user"> {t('user')}</option>
          </select>
          <input
            className="searchInput"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder={t('search_a_game') + '...'}
            width={5}
          ></input>
          <button className="searchButton" type="submit" onClick={()=>{
            if(searchValue!==""){
              navigate('/search?q='+searchValue)
              navigate(0)
            }else{
              navigate('/search')
              navigate(0)
            }
          }}>
              <img className="mx-auto" src={SearchIcon} alt="search-icon" />
          </button>
        </div>
        <div className="separationLine"></div>
        <div className="toggleMenu" onClick={handleSidebarClick}>
          <img src={toggleMenu} className="icon" alt="Notification-icon"></img>
        </div>
        <Link to="/" className="logo">
          {/* MyPlayLog */}
          <img
            style={{ width: '100%' }}
            src={MyPlayLogoLogo}
            alt="my-play-log-logo"
          />
        </Link>
        {/* <div className="notification">
        <img
          src={NotificationIcon}
          className="icon"
          alt="Notification-icon"
        ></img>
      </div> */}
        <div className="search">
          <img
            onClick={() => {
              setShowSidebar(false)
              document.querySelector('.navbar').classList.toggle('active')
            }}
            src={SearchIcon}
            className="icon mx-auto my-auto"
            alt="search-icon"
          ></img>
          <div className="input">
            <input
              className="inputMobile"
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              placeholder={t('search_a_game') + '...'}
            ></input>
          </div>
          <span className="clear" onClick={() => setSearchValue('')}></span>
        </div>
        <div className="connection">
          <StyledButton className="signup">
            {t('sign_up').toUpperCase()}
          </StyledButton>
          <StyledButton className="login">
            {t('login').toUpperCase()}
          </StyledButton>
        </div>
      </nav>
    </form>
  )
}
export default Navbar
