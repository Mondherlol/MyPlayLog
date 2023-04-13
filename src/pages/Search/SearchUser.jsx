import React, { Component, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import colors from '../../utils/style/colors'
import UserCard from '../../components/UserCard/UserCard'
import ErrorOccured from '../../components/ErrorOccured/ErrorOccured'
import GameCardPlaceholder from '../../components/GameCard/GameCardPlaceholder'
import UserCardPlaceHolder from '../../components/UserCard/UserCardPlaceHolder'

const Wrapper = styled.div`

  min-height: 100vh;
`

const SearchUser =({searchValue, setSearchValue,searchType, setSearchType} )=> {
    const location = useLocation()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

   const lala=()=> {
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
        //mafhemtch searchValue chbiha tt9rach wena m3odiha fl props
        // console.log(searchValue+" => "+q)
        setSearchValue(q)
        setSearchType('user')

      }

    //   setIsLoading(true)

    axios
      .get(
        `${process.env.REACT_APP_IP_ADRESS}/api/user/search` +"?username="+q
      
      )
      .then((res) => {
        if (res.data === 'Pas de resultat.') {
        //   setNotEmptyResults(false)
        } else {
        //   setNotEmptyResults(true)
          setData(res.data.users)
          
        }
      })
      .catch((err) => {
        console.log(err)
        // setError(err)
      })
 .finally(() => setIsLoading(false))
    
    }


      useEffect(()=>{
        lala()
        console.log(data)
      },[])

        return (
            <Wrapper >
                <div className='mt-36 ' >

                {error !== null && <ErrorOccured />}
                <div className=" ml-4  grid grid-cols-2 gap-y-3 gap-x-[0px] sm:grid-cols-3 lg:grid-cols-4 lg:ml-3 xl:grid-cols-5 2xl:grid-cols-8   ">
                    {isLoading && (
                    <>
                        {Array.from({ length: 12 }).map((_, index) => (
                        <UserCardPlaceHolder key={`placeholder ${index}`} />
                        ))}
                    </>
                    )}
                </div>

                <div className='ml-4 grid grid-cols-2 gap-y-3 gap-x-[0px] sm:grid-cols-3 lg:grid-cols-4 lg:ml-3 xl:grid-cols-5 2xl:grid-cols-8' >
                
            {data.map((ele)=>{

                return (
                    
                    <UserCard ele={ele}/>  
                    
                )
            })}

                </div>
                </div>
               
            </Wrapper>
        );
    }


export default SearchUser;