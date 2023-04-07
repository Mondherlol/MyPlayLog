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

const HomePage = lazy(() => import('../Home/Home'))
const Credits = lazy(() => import('../Credits/Credits'))
const BottomBar = lazy(() => import('../../components/BottomBar/BottomBar'))
const ErrorPage = lazy(() => import('../Error/Error'))
const GamePage = lazy(() => import('../Game/Game'))
const Search = lazy(() => import('../Search/Search'))
const ListPage = lazy(() => import('../ListPage/ListPage'))
const ExploreLists = lazy(() => import('../ExploreLists/ExploreLists'))
const EditList = lazy(() => import('../EditList/EditList'))

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
  const [navBg, setNavBg] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const body = document.querySelector('body')
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

  //For changing navbar Background on Scroll
  const changeNavBg = (e) => {
    window.scrollY > 30 ? setNavBg(true) : setNavBg(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNavBg)
    return () => {
      window.removeEventListener('scroll', changeNavBg)
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
            <div className={`navbarBg ${navBg ? 'show' : ''}`}></div>
            <Header style={headerStyle}>
              <Navbar
                // isMobile={isMobile}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Header>

            <Content style={contentStyle}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:slug" element={<GamePage />} />
                <Route path="/lists" element={<ExploreLists />} />
                <Route path="/list/:listId" element={<ListPage />} />
                <Route path="/list/:listId/edit" element={<EditList />} />

                <Route path="/credits" element={<Credits />} />
                <Route
                  path="/search"
                  element={
                    <Search
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
                  }
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <MyPlayLogFooter />
            </Content>

            {isMobile && <BottomBar />}
          </Layout>
        </Suspense>
      </Layout>
    </Suspense>
  )
}
export default App
