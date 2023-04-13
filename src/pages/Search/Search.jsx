import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal, Radio } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

import filterIcon from '../../assets/icons/filter.png'
import './search.css'
import colors from '../../utils/style/colors'
import ElementList from './FilterElements'
import filterTable from '../../utils/data/Filters'
import GameCard from '../../components/GameCard/GameCard'
import ErrorOccured from '../../components/ErrorOccured/ErrorOccured'
import GameCardPlaceholder from '../../components/GameCard/GameCardPlaceholder'

const All = {
  marginLeft: '1%',
  display: 'flex',
  backgroundColor: 'transparent',
  minHeight: '100vh',
}
// #110f32

export default function Search({ searchValue, setSearchValue, setSearchType }) {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [filters, setFilters] = useState([])
  const [showSearchRadio, setShowSearchRadio] = useState(searchValue !== '')
  const [searchRadioValue, setSearchRadioValue] = useState(1)
  const [NotEmptyResults, setNotEmptyResults] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  document.title = t('explore') + ' - MyPlayLog'

  //jib data ml link
  const getDataFromLink = () => {
    //nwali najem n3ml get 3l URL params
    if (!('URLSearchParams' in window)) {
      window.URLSearchParams = function (searchString) {
        var searchParams = new Map()
        searchString = searchString.replace(/^[?#]/, '')

        searchString.split('&').forEach(function (param) {
          var parts = param.split('=')
          var key = decodeURIComponent(parts[0])
          var value = parts.length > 1 ? decodeURIComponent(parts[1]) : ''

          if (!searchParams.has(key)) {
            searchParams.set(key, value)
          } else if (searchParams.get(key) !== value) {
            searchParams.set(key, [searchParams.get(key), value])
          }
        })

        return {
          get: function (key) {
            if (searchParams.has(key)) {
              return searchParams.get(key)
            } else {
              return null
            }
          },
        }
      }
    }

    // params ml link
    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get('q')
    if (q) {
      setSearchValue(q)
      setSearchType('game')
    }
    //n3abi lfilters ml link
    var filterss = []
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'q') {
        var allvals = value.split(',')
        allvals.forEach((v) => {
          const typeFilter = filterTable.find((item) => item.name === key) //On récupere le tableau de filtre correspondant
          const objectFilter = typeFilter.elements.find(
            (item) => item.id === parseInt(v) //On récupere le filtre actif
          )
          const name =
            key === 'platforms'
              ? objectFilter.abbreviation
                ? objectFilter.abbreviation
                : objectFilter.name
              : t(objectFilter.slug ? objectFilter.slug : objectFilter.name) //On traduit le nom du filtre

          filterss.push({
            value: key + '=' + v,
            name: name,
          })
        })
      }
    }
    setFilters([...filterss])
    setIsLoading(true)

    axios
      .get(
        `${process.env.REACT_APP_IP_ADRESS}/api/games/search` +
          location.search.toString()
      )
      .then((res) => {
        if (res.data === 'Pas de resultat.') {
          setNotEmptyResults(false)
        } else {
          setNotEmptyResults(true)
          setData(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getDataFromLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //n3rf ena fil mobile wela web
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is at least 1024px (the `lg` breakpoint in Tailwind CSS)
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Add an event listener for the `resize` event
    window.addEventListener('resize', handleResize)

    // Call `handleResize` once on component mount to initialize the state
    handleResize()

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  //modal
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    if (isLargeScreen) {
      setConfirmLoading(true)
    }

    //create request
    var charLink = ''
    if (filters.length > 0 || searchValue !== '') {
      charLink += '?'
    }
    //search value
    if (searchRadioValue === 0 || searchValue === '') {
      //all
      // charLink = ''
    } else {
      charLink = '?q=' + searchValue
    }
    var filteredTab = []
    filters.forEach((filter) => {
      const v = filter.value
      var type = v.split('=')[0]
      if (!filteredTab.some((item) => item.name === type)) {
        filteredTab.push({ name: type, elements: [v.split('=')[1]] })
      } else {
        filteredTab.forEach((v2) => {
          if (v2.name === type) {
            v2.elements.push(v.split('=')[1])
          }
        })
      }
    })

    filteredTab.forEach((v) => {
      charLink += '&' + v.name + '='
      v.elements.forEach((v2) => {
        if (v.elements[v.elements.length - 1] === v2) {
          charLink += v2
        } else {
          charLink += v2 + ','
        }
      })
    })
    if (charLink.startsWith('&')) {
      charLink = charLink.substring(1)
    }
    charLink = charLink.replace(/\?&/g, '?')

    console.log(charLink)
    navigate('/search' + charLink)
    //reload the page
    navigate(0)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  // on change radio
  const onChangeRadio = (e) => {
    setSearchRadioValue(e.target.value)
    console.log(searchRadioValue)
  }

  useEffect(() => {
    setShowSearchRadio(searchValue !== '')
  }, [searchValue])

  return (
    <div
      className="mt-[20%] sm:mt-[15%] lg:mt-[10%] xl:mt-[7%] mb-[10vh] lg:mb-10  "
      style={All}
    >
      <div
        className="container mx-auto "
        style={{ backgroundColor: 'transparent' }}
      >
        {/* filters div web   */}
        <div
          className="hidden lg:flex flex-col gap-1 box-content rounded-lg  sticky top-20 bg-red-50 "
          style={{
            backgroundColor: 'transparent',
            width: '20%',
            float: 'left',
            height: '85vh',
          }}
        >
          <div
            className="hidden lg:block box-content rounded-lg  overflow-y-auto  scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px] "
            style={{
              height: '80vh',
            }}
          >
            <div className="relative pb-1 ">
              {filterTable.map((ele) => {
                return (
                  <div
                    className="mx-auto w-11/12  mt-2 mb-2 rounded-lg"
                    style={{ backgroundColor: '#08071B' }}
                    key={ele.name}
                  >
                    <h2
                      className="ml-4 pt-1 text-sm 2xl:text-xl"
                      style={{ color: `${colors.primary}` }}
                    >
                      {t(ele.name).toUpperCase()}
                    </h2>
                    <div className="ml-3 mt-2">
                      <ElementList
                        filters={filters}
                        setFilters={setFilters}
                        elementName={ele.name}
                        elements={ele.elements}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-center items-center w-full   relative ">
            <Button
              type="button"
              className=" font-bold float-right rounded-3xl pl-4 pr-4 hidden lg:block  "
              style={{
                backgroundColor: `${colors.primary}`,
                fontSize: '15px',
              }}
              onClick={handleOk}
            >
              <img
                src={filterIcon}
                height="15"
                alt="filter icon"
                className="pt-[2px] mr-1"
              />
              {t('apply_filter')}{' '}
              {filters.length !== 0 && `(${filters.length})`}
            </Button>
          </div>
        </div>
        {/* style={{backgroundColor:`${colors.background}`}} */}
        <div
          className=" w-full h-full bg-cyan-500 lg:w-4/5 lg:float-right   "
          style={{ backgroundColor: 'transparent' }}
        >
          <div className=" flex flex-col items-center">
            <Button
              type="button"
              className="  font-bold rounded-2xl px-5 p-2 flex flex-row justify-center items-center gap-1  z-10  shadow-2xl  fixed bottom-[70px] sm:bottom-[20px] text-center lg:hidden"
              style={{ backgroundColor: `${colors.primary}`, fontSize: '1rem' }}
              onClick={showModal}
            >
              <img src={filterIcon} height="15" alt="filter icon" />{' '}
              {t('filters')} {filters.length !== 0 && `(${filters.length})`}
            </Button>
          </div>

          <Modal
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            wrapClassName="modal"
            okButtonProps={{
              style: {
                backgroundColor: `${colors.primary}`,
                color: '#110f32',
                fontWeight: 'bold',
              },
            }}
            cancelButtonProps={{ style: { fontWeight: 'bold' } }}
            okText={t('apply_filter')}
            cancelText={t('cancel')}
          >
            {showSearchRadio && (
              <Radio.Group
                name="radiogroup"
                defaultValue={1}
                onChange={onChangeRadio}
              >
                <Radio value={1} style={{ color: 'white' }}>
                  {searchValue}
                </Radio>
                <Radio value={0} style={{ color: 'white' }}>
                  {t('all')}
                </Radio>
              </Radio.Group>
            )}

            {filterTable.map((ele) => {
              return (
                <div key={ele.name}>
                  <h2 style={{ color: `${colors.primary}` }}>
                    {t(ele.name).toUpperCase()}
                  </h2>
                  <ElementList
                    filters={filters}
                    setFilters={setFilters}
                    elementName={ele.name}
                    elements={ele.elements}
                  />
                </div>
              )
            })}
          </Modal>

          {filters && filters.length !== 0 && (
            <div className="ml-2  md:ml-8 flex flex-row flex-wrap overflow-hidden justify-start items-end gap-2">
              <h2>{t('filters')} : </h2>
              {filters.map((filter) => {
                return (
                  <button
                    key={`active filter ${filter.name}`}
                    onClick={() => {
                      const filterRemoved = filters.filter(
                        (item) => item.value !== filter.value
                      )
                      setFilters(filterRemoved)
                    }}
                    className="p-2 rounded-md  cursor-pointer  border-none "
                    style={{
                      background: colors.primary,
                      color: colors.background,
                    }}
                  >
                    {filter.name} ✖
                  </button>
                )
              })}
              <button
                onClick={() => setFilters([])}
                className="p-2 rounded-md  border-none cursor-pointer text-white  "
                style={{
                  backgroundColor: colors.danger,
                }}
              >
                {t('clear_filters')}{' '}
              </button>
            </div>
          )}

          {/* all games cards */}

          {error !== null && <ErrorOccured />}
          <div className=" ml-4  lg:ml-3 flex flex-row flex-wrap overflow-hidden justify-center   ">
            {isLoading && (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <GameCardPlaceholder key={`placeholder ${index}`} />
                ))}
              </>
            )}
          </div>
          {/* <div className="ml-4 grid grid-cols-2 gap-y-3 gap-x-[0px] sm:grid-cols-3 lg:grid-cols-4 lg:ml-3 xl:grid-cols-5 2xl:grid-cols-6"> */}
          <div className=" ml-4  lg:ml-3 flex flex-row flex-wrap overflow-hidden justify-center  pb-8 ">
            {!isLoading &&
              NotEmptyResults &&
              data.map((game) => {
                return <GameCard key={game.id} game={game} />
              })}
          </div>
          {/* {<button>Load more</button>} */}
          {!isLoading && !NotEmptyResults && (
            <h1 style={{ textAlign: 'center' }}>{t('no_result')}</h1>
          )}
        </div>
      </div>
    </div>
  )
}
