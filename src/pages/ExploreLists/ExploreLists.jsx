import styled from 'styled-components'
import { Pagination, ConfigProvider } from 'antd'
import axios from 'axios'
import { useEffect, useState, useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import colors from '../../utils/style/colors'
import CreateListModal from '../../components/ListComponents/CreateListModal/CreateListModal'
import ListFilters from '../../components/ListComponents/ListFilters/ListFilters'
import SortingLists from './SortingLists'
import filterIcon from '../../assets/icons/filter.png'
import ListFIltersModal from '../../components/ListComponents/ListFilters/ListFIltersModal'
import ListCard from './ListCard'
import ListCardPlaceholder from './ListCardPlaceholder'
import { useTranslation } from 'react-i18next'
import { LoginContext } from '../../Helper/Context'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  background-color: ${colors.background};
  justify-content: start;
  align-items: start;
  min-height: 100vh;
`
function ExploreLists() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState(null)
  const [isRanked, setIsRanked] = useState(null)
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalLists, setTotalLists] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const listPerPage = 10
  const [progress, setProgress] = useState(0)
  const [sortBy, setSortBy] = useState('lastUpdate')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortQuery, setSortQuery] = useState('')
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const navigate = useNavigate()
  const [showFilterButton, setShowFilterButton] = useState(true)
  const { t } = useTranslation()
  const { loggedIn } = useContext(LoginContext)

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + 30 + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setShowFilterButton(false)
    } else {
      setShowFilterButton(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const getLists = () => {
    document.title = t('lists') + ' - My PlayLog'

    setProgress(20)
    setIsLoading(true)
    let uri = `${
      process.env.REACT_APP_IP_ADRESS
    }/api/lists/?page=${currentPage}&limit=${listPerPage}${
      searchQuery !== null && searchQuery !== '' ? '&q=' + searchQuery : ''
    }${
      isRanked !== null && isRanked !== '' ? '&ranked=' + isRanked : ''
    }${sortQuery}
    `
    axios
      .get(uri.trim(), { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setLists(res.data.lists)
        setTotalLists(res.data.totalLists)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
        setProgress(100)
      })
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSearchQuery(() => searchParams.get('q') || '')
    setIsRanked(() => searchParams.get('ranked') || '')
    setSortBy(() => searchParams.get('sort') || 'lastUpdate')
    setSortOrder(() => searchParams.get('order') || 'desc')
    setCurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    if (isRanked !== null && searchQuery !== null) getLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRanked, searchQuery])

  useEffect(() => {
    console.log(currentPage)
    if (lists && lists.length !== 0) {
      getLists()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    if (lists && lists.length !== 0) {
      let uri = `/lists?${
        searchQuery !== null && searchQuery !== '' ? '&q=' + searchQuery : ''
      }${
        isRanked !== null && isRanked !== '' ? '&ranked=' + isRanked : ''
      }${sortQuery}
      `
      console.log(uri)
      navigate(uri)
      if (currentPage === 1) getLists()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortQuery])

  return (
    <PageWrapper>
      <LoadingBar
        color={colors.primary}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ListFIltersModal
        isFilterModalVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
        ranked={isRanked}
        query={searchQuery}
        setIsModalOpen={setIsModalOpen}
        sortQuery={sortQuery}
      />
      {/* Mobile buttons */}
      <div
        className=" flex   z-20 justify-center fixed bottom-[80px]   items-center w-full  lg:hidden "
        style={{ minWidth: '300px' }}
      >
        <button
          type="button"
          className=" font-bold rounded-2xl px-5 p-2  shadow-2xl  text-center lg:hidden cursor-pointer "
          style={{
            backgroundColor: `${colors.primary}`,
            fontSize: '1rem',
            display: showFilterButton ? 'block' : 'none',
          }}
          onClick={() => setIsFilterModalVisible(true)}
        >
          <img
            src={filterIcon}
            height="15"
            alt="filter icon"
            className="pt-[5px] mr-[6px]"
          />{' '}
          {t('filter')}
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed z-50 right-5 bottom-[80px]  rounded-full p-2 px-3 text-center lg:hidden cursor-pointer shadow-2xl "
          style={{ backgroundColor: `${colors.primary}`, fontSize: '1.5em' }}
        >
          +
        </button>
      </div>

      <div className="flex flex-row justify-start items-start w-full py-8 h-full min-h-full ">
        <div className=" hidden lg:flex flex-col  ml-4 gap-2 sticky top-20">
          <ListFilters
            ranked={isRanked}
            query={searchQuery}
            setIsModalOpen={setIsModalOpen}
            sortQuery={sortQuery}
          />
          <button
            onClick={() => {
              if (loggedIn) setIsModalOpen(true)
              else navigate('/login')
            }}
            style={{
              color: colors.backgroundDerivation,
              backgroundColor: colors.primary,
              fontWeight: 'extra-bold',
            }}
            className=" text-white p-2 m-2 border-none hover:cursor-pointer "
          >
            {t('create_your_list').toUpperCase()}
          </button>
        </div>

        <div className="flex flex-col  justify-center items-center w-full ">
          <div
            className={`flex  flex-row justify-${
              totalLists !== 0 ? 'between' : 'end'
            } items-end w-full px-8`}
          >
            {totalLists !== 0 && (
              <h3 className="font-normal p-2">
                {totalLists} {t('results')}
              </h3>
            )}
            <SortingLists
              setSortOrder={setSortOrder}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              sortBy={sortBy}
              setSortQuery={setSortQuery}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 px-8">
            {isLoading && (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <ListCardPlaceholder key={'list + ' + index} />
                ))}
              </>
            )}
            {!isLoading && lists.length === 0 && (
              <h2
                style={{
                  color: colors.primary,
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                {t('no_result')}.
              </h2>
            )}{' '}
            {!isLoading &&
              lists.map((list) => {
                return <ListCard list={list} />
              })}
          </div>

          <CreateListModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            redirectEdit={true}
          />

          {lists.length !== 0 && (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: colors.backgroundDerivation,
                  colorText: 'white',
                  colorTextDisabled: 'grey',
                },
              }}
            >
              <Pagination
                className="mt-12 mb-4"
                onChange={(page) => setCurrentPage(page)}
                defaultCurrent={currentPage}
                current={currentPage}
                pageSize={listPerPage}
                total={totalLists}
              />
            </ConfigProvider>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ExploreLists
