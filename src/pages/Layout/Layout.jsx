import { Layout } from 'antd'
import { useState, useEffect, lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom'

import './Layout.css'
import { Loader } from '../../utils/Atoms'
import colors from '../../utils/style/colors'

import Navbar from '../../components/Navbar/Navbar'
import SideBarMobile from '../../components/SideBar/SideBarMobile'
import SideBar from '../../components/SideBar/SideBar'
import MyPlayLogFooter from '../../components/Footer/Footer'
import { LoginContext, LoginData } from '../../Helper/Context'
import TestPage from '../TestPage/TestPage'
import SearchUser from '../Search/SearchUser'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = lazy(() => import('../Home/Home'))
const Credits = lazy(() => import('../Credits/Credits'))
const BottomBar = lazy(() => import('../../components/BottomBar/BottomBar'))
const ErrorPage = lazy(() => import('../Error/Error'))
const GamePage = lazy(() => import('../Game/Game'))
const Search = lazy(() => import('../Search/Search'))
const Login = lazy(() => import('../login/Login'))
const SignUp = lazy(() => import('../singnUp/SignUp'))
const ListPage = lazy(() => import('../ListPage/ListPage'))
const ExploreLists = lazy(() => import('../ExploreLists/ExploreLists'))
const EditList = lazy(() => import('../EditList/EditList'))
const UserPage = lazy(() => import('../UserPage/UserPage'))
const { Header, Sider, Content } = Layout

const headerStyle = {
  position: 'sticky',
  top: 0,
  height: 0,
  paddingLeft: 7,
  paddingRight: 7,
  zIndex: 10,
}

const contentStyle = {
  color: '#fff',
  backgroundColor: colors.background,
}
const siderStyle1 = {
  backgroundColor: '#08071B',
  // height: '100%',
}

const siderStyle = {
  zIndex: 15,
  color: '#fff',
  backgroundColor: '#08071B',
  position: 'sticky',
  top: 0,
  bottom: 0,
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  minWidth: 320,
}
const layoutStyle = {
  // height: '100%',
  // minHeight: '100%',
  minWidth: 320,
  position: 'relative',
  backgroundColor: '#08071B',
}

const App = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  //search Type 
  const [searchType, setSearchType] = useState('game')
  const body = document.querySelector('body')

  // login useContext useState
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState(null)



  //For knowing if it's mobile or not
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 750px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = (event) => {
      setIsMobile(event.matches)
    }
    mediaQuery.addEventListener('change', handleResize)
    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  //Closing SideBar if opened when it's not mobile
  useEffect(() => {
    return setShowSidebar(false)
  }, [isMobile])

  //Prevent scrolling when sideBar mobile opened
  useEffect(() => {
    if (showSidebar) body.classList.add('no-scroll')
    else body.classList.remove('no-scroll')
  }, [body.classList, showSidebar])

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <LoginData.Provider value={{ loginData, setLoginData }}>
        <Suspense
          fallback={
            <div className=" flex h-screen  justify-center items-center">
              <Loader />
            </div>
          }
        >
          <Layout style={layoutStyle}>
            {isMobile ? (
              <SideBarMobile
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            ) : (
              <Sider style={siderStyle}>
                <SideBar style={siderStyle1} />
              </Sider>
            )}
            <Suspense
              fallback={
                <div className=" flex h-screen  justify-center items-center">
                  <Loader />
                </div>
              }
            >
              <Layout
                onClick={(e) => {
                  if (isMobile && showSidebar) {
                    setShowSidebar(false) // ferme la sideBar
                  }
                }}
                className={showSidebar ? 'sideBarOpened' : ''}
              >
                <div className="navbarBg"></div>
                <Header style={headerStyle}>
                  <Navbar
                    // isMobile={isMobile}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchType={searchType} setSearchType={setSearchType}
                  />
                </Header>

                <Content style={contentStyle}>
                  <ToastContainer />

                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/:slug" element={<GamePage />} />
                    <Route path="/lists" element={<ExploreLists />} />
                    <Route path="/list/:listId" element={<ListPage />} />
                    <Route path="/list/:listId/edit" element={<EditList />} />

                    <Route path="/test" element={<TestPage />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route
                  path="/search"
                  element={
                    <Search
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      searchType={searchType} setSearchType={setSearchType}
                    />
                  }
                />
                <Route path='/user/search' element={<SearchUser
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      searchType={searchType} setSearchType={setSearchType}
                />} />
                    <Route path="/user/:userId" element={<UserPage />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                  <MyPlayLogFooter />
                </Content>

                {isMobile && <BottomBar />}
              </Layout>
            </Suspense>
          </Layout>
        </Suspense>
      </LoginData.Provider>
    </LoginContext.Provider>
  )
}
export default App
