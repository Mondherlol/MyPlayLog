import styled, { keyframes } from 'styled-components'
import { Pagination, ConfigProvider } from 'antd'
import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import colors from '../../utils/style/colors'
import CreateListModal from '../../components/ListComponents/CreateListModal/CreateListModal'
import ListFilters from '../../components/ListComponents/ListFilters/ListFilters'
import SortingLists from './SortingLists'
import filterIcon from '../../assets/icons/filter.png'
import ListFIltersModal from '../../components/ListComponents/ListFilters/ListFIltersModal'
import ListCard from './ListCard'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  background-color: ${colors.background};
  justify-content: start;
  align-items: start;
  min-height: 100vh;
`
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 260px;
  width: 100%;
  background-color: ${colors.backgroundDerivation};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.01);
    z-index: 1;
  }

  overflow: hidden;
  box-shadow: inset 0 3px 15px 3px #0009;
  position: relative;
`

const CoversContainer = styled.div`
  // border-top-left-radius: 16px;
  // border-top-right-radius: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: rgb(83 81 126 / 21%);
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  // width: 100px;
  // height: 100px;
  // object-fit: cover;
  // flex-shrink: 0;
  // box-shadow: inset 0 3px 15px 3px #0009;
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
    setProgress(20)
    setIsLoading(true)
    let uri = `http://${
      process.env.REACT_APP_IP_ADRESS
    }:8000/api/lists/?page=${currentPage}&limit=${listPerPage}${
      searchQuery !== null && searchQuery !== '' ? '&q=' + searchQuery : ''
    }${
      isRanked !== null && isRanked !== '' ? '&ranked=' + isRanked : ''
    }${sortQuery}
    `
    axios
      .get(uri.trim())
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
          Filter
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
              setIsModalOpen(true)
            }}
            style={{
              color: colors.backgroundDerivation,
              backgroundColor: colors.primary,
              fontWeight: 'extra-bold',
            }}
            className=" text-white p-2 m-2 border-none hover:cursor-pointer "
          >
            CREATE YOUR LIST{' '}
          </button>
        </div>

        <div className="flex flex-col  justify-center items-center w-full ">
          <div
            className={`flex  flex-row justify-${
              totalLists !== 0 ? 'between' : 'end'
            } items-end w-full px-8`}
          >
            {totalLists !== 0 && (
              <h3 className="font-normal p-2">{totalLists} résultats</h3>
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
                  <ListContainer key={index}>
                    <CoversContainer>
                      <div
                        className="loading"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      ></div>
                    </CoversContainer>
                    <div
                      style={{ display: 'flex', flexDirection: 'column', p: 2 }}
                    >
                      <div style={{ padding: '20px 30px' }}>
                        <h2
                          className="loading mb-4"
                          style={{
                            width: 300,
                            height: 30,
                            background: 'rgb(83 81 126 / 21%)',
                          }}
                        >
                          {' '}
                        </h2>
                        <p
                          className="loading"
                          style={{
                            height: 50,
                            background: 'rgb(83 81 126 / 21%)',
                          }}
                        ></p>
                      </div>
                    </div>
                  </ListContainer>
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
                Aucun résultat.
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
