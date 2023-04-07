import React from 'react'
import { useTranslation } from 'react-i18next'
import poster from '../../assets/images/poster.png'
import { Button, Modal, Radio } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import filterIcon from '../../assets/icons/filter.png'
import './search.css'
import colors from '../../utils/style/colors'
import ElementList from './FilterElements'
import filterTable from '../../utils/data/Filters'

const All = {
  marginLeft: '1%',
  display: 'flex',
  backgroundColor: 'transparent',
  minHeight: '100vh',
}
// #110f32

export default function Search({ searchValue, setSearchValue }) {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [filters, setFilters] = useState([])
  const [showSearchRadio, setShowSearchRadio] = useState(searchValue !== '')
  const [searchRadioValue, setSearchRadioValue] = useState(1)
  const [NotEmptyResults, setNotEmptyResults] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

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
    //n3abi lfilters ml link
    var filterss = []
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'q') {
        var allvals = value.split(',')
        allvals.forEach((v) => {
          filterss.push(key + '=' + v)
        })
      }
    }
    setFilters([...filterss])
    axios
      .get(
        `${process.env.REACT_APP_IP_ADRESS}/api/games/searchs` +
          location.search.toString()
      )
      .then((res) => {
        if (res.data === 'Pas de resultat.') {
          setNotEmptyResults(false)
        } else {
          setNotEmptyResults(true)
          if (q) {
            setSearchValue(q)
          }

          setData(res.data)
        }
      })
      .catch((err) => {
        console.log('filtre:' + err)
      })
  }

  useEffect(() => {
    getDataFromLink()
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
    filters.forEach((v) => {
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
      className="mt-[20%] sm:mt-[15%] lg:mt-[10%] xl:mt-[7%] mb-[10vh] lg:mb-0"
      style={All}
    >
      <div
        className="container mx-auto "
        style={{ backgroundColor: 'transparent' }}
      >
        {/* filters div web    #0d0b29*/}
        <div
          className="hidden lg:block box-content rounded-lg"
          style={{
            backgroundColor: 'transparent',
            width: '20%',
            float: 'left',
          }}
        >
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
        {/* searchbar+games div */}
        <div className="w-full h-10 ">
          <Button
            type="button"
            className=" font-bold float-right mr-2 rounded-3xl pl-4 pr-4 hidden lg:block "
            style={{ backgroundColor: `${colors.primary}`, fontSize: '15px' }}
            onClick={handleOk}
          >
            <img
              src={filterIcon}
              height="15"
              alt="filter icon"
              className="pt-[2px] mr-[6px]"
            />
            Apply Filter
          </Button>
        </div>
        {/* style={{backgroundColor:`${colors.background}`}} */}
        <div
          className=" w-full h-full bg-cyan-500 lg:w-4/5 lg:float-right overflow-y-scroll scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]   "
          style={{ backgroundColor: 'transparent', height: '97vh' }}
        >
          {/* filter modal */}
          {/* <div className='w-full h-10 '>
                <Button type="button" className=' font-bold float-right mr-2 rounded-2xl pl-4 pr-4  lg:hidden ' style={{backgroundColor:`${colors.primary}`,fontSize:'1rem'}} onClick={showModal}>
                    <img src={filterIcon} height="15" alt="filter icon" className='pt-[5px] mr-[6px]'  />  Filter
                </Button>
                </div> */}
          <div className=" flex flex-col items-center">
            <Button
              type="button"
              className=" font-bold  mr-2 rounded-2xl pl-5 pr-5  shadow-2xl  fixed bottom-[70px] sm:bottom-[20px] text-center lg:hidden"
              style={{ backgroundColor: `${colors.primary}`, fontSize: '1rem' }}
              onClick={showModal}
            >
              <img
                src={filterIcon}
                height="15"
                alt="filter icon"
                className="pt-[5px] mr-[6px]"
              />{' '}
              Filter
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
            okText="Apply Filter"
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
                  All
                </Radio>
              </Radio.Group>
            )}

            {filterTable.map((ele) => {
              return (
                <div key={ele.name}>
                  <h2 style={{ color: `${colors.primary}` }}>{t(ele.name)}</h2>
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
          {/* filter badges */}

          {/* all games cards */}
          {NotEmptyResults && (
            <div className="ml-4 grid grid-cols-2 gap-y-3 gap-x-[0px] sm:grid-cols-3 lg:grid-cols-4 lg:ml-3 xl:grid-cols-5 2xl:grid-cols-6">
              {data.map((game) => {
                var url = game.cover ? game.cover.url : poster
                url = url.replace('t_thumb', 't_cover_big')
                var gamePage = '/game/' + game.slug

                return (
                  <>
                    <div
                      key={game.id}
                      className="h-[230px] w-[170px] loading"
                      style={{ cursor: 'pointer' }}
                    >
                      {' '}
                      <Link to={gamePage}>
                        <img
                          className="rounded-lg h-full w-full "
                          style={{ objectFit: 'cover' }}
                          src={url}
                          alt="game"
                        />{' '}
                      </Link>
                    </div>
                  </>
                )
              })}
            </div>
          )}
          {!NotEmptyResults && (
            <h1 style={{ textAlign: 'center' }}>no results</h1>
          )}
        </div>
      </div>
    </div>
  )
}
