import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import colors from '../../utils/style/colors'

import './Navbar.css'
import SearchIcon from '../../assets/icons/search.png'
import toggleMenu from '../../assets/icons/navbar/hamburger.png'
import MyPlayLogoLogo from '../../assets/myplaylog_logo_transparent_horizontal.png'
import { LoginContext, LoginData } from '../../Helper/Context'
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

function Navbar({
  showSidebar,
  setShowSidebar,
  searchValue,
  setSearchValue,
  searchType,
  setSearchType,
}) {
  const handleSidebarClick = () => {
    setShowSidebar(!showSidebar)
  }
  const { t } = useTranslation()
  const navigate = useNavigate()

  //useContext Logged in
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const { loginData, setLoginData } = useContext(LoginData)

  const [openProfileMenu, setOpenProfileMenu] = useState(false)

  useEffect(() => {
    axios({
      method: 'post',
      data: {},
      withCredentials: true,
      url: `${
        process.env.REACT_APP_IP_ADRESS
      }/api/user/logged?timestamp=${new Date().getTime()}`,
    }).then((res) => {
      if (res.data.message === 'Successfully Authenticated') {
        setLoginData(res.data.user)
        setLoggedIn(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

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
      }
    })
  }

  return (
    <form
      className="navbar-form"
      onSubmit={(e) => {
        e.preventDefault()
        const searchType = e.target.elements.searchType.value
        if (searchType === 'game') {
          if (searchValue !== '') {
            navigate('/search?q=' + searchValue)
            navigate(0)
          } else {
            navigate('/search')
            navigate(0)
          }
        } else {
          if (searchValue !== '') {
            navigate('/user/search?q=' + searchValue)
            navigate(0)
          } else {
            navigate('/search')
            navigate(0)
          }
        }
      }}
    >
      <nav className="navbar">
        <div className="searchBar">
          <select
            className="searchType"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value)
            }}
          >
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
          <button
            className="searchButton"
            type="submit"
            onClick={() => {
              if (searchType === 'game') {
                if (searchValue !== '') {
                  navigate('/search?q=' + searchValue)
                  navigate(0)
                } else {
                  navigate('/search')
                  navigate(0)
                }
              } else {
                if (searchValue !== '') {
                  navigate('/user/search?q=' + searchValue)
                  navigate(0)
                } else {
                  navigate('/search')
                  navigate(0)
                }
              }
            }}
          >
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

        {/* Login sign Up if not Logged in  */}

        {loggedIn ? (
          <div className="connection relative ">
            <div
              className="relative  h-10 rounded-full   cursor-pointer"
              style={{ backgroundColor: 'transparent' }}
            >
              <div
                className="absolute top-0 left-0 w-11 h-11 rounded-full  shadow-md flex items-center justify-center"
                onClick={() => {
                  setOpenProfileMenu(!openProfileMenu)
                }}
                style={{ backgroundColor: colors.primary }}
              >
                <img
                  src={loginData ? loginData.profilePic : ''}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="absolute top-0 left-14 w-22 h-10 flex items-center justify-center">
                <h2 className="text-white text-sm text-bold truncate">
                  {loginData.username}{' '}
                </h2>
              </div>
            </div>

            {openProfileMenu && (
              <div
                className="absolute mt-2 w-56 h-fit pb-4 rounded-md mr-28 "
                style={{ backgroundColor: colors.backgroundDerivation }}
              >
                {/* <div className=" rounded-sm cursor-pointer text-white text-base font-bold pl-5 pt-1 pb-1 mt-3 w-full hover:bg-slate-700 hover:ease-in hover:duration-300">
                  Account
                </div> */}
                <Link to={`/user/${loginData._id}`}>
                  <div className="rounded-sm cursor-pointer text-white text-base font-bold pl-5 pt-1 pb-1 mt-3 w-full hover:bg-slate-700 hover:ease-in hover:duration-300">
                    {t('profile')}
                  </div>
                </Link>

                <div className="rounded-sm cursor-pointer text-white text-base font-bold pl-5 pt-1 pb-1 mt-3 w-full hover:bg-slate-700 hover:ease-in hover:duration-300">
                  {t('settings')}
                </div>

                <hr
                  className="mt-5 border-2 rounded-md w-52 mx-auto"
                  style={{ borderColor: colors.primary }}
                />

                <div
                  className="rounded-sm cursor-pointer text-white text-base font-bold pl-5 pt-1 pb-1 mt-1 w-full hover:bg-slate-700 hover:ease-in hover:duration-300"
                  onClick={Logout}
                >
                  {t('log_out')}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="connection">
            <StyledButton className="signup" to="/signUp">
              {t('sign_up').toUpperCase()}
            </StyledButton>
            <StyledButton className="login" to="/login">
              {t('login').toUpperCase()}
            </StyledButton>
          </div>
        )}
      </nav>
    </form>
  )
}
export default Navbar
