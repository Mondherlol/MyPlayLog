import { Suspense, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.css'
import colors from '../../utils/style/colors'
import GamesSections from './HomeComponents/GamesSections'
import SelectionGames from './HomeComponents/SelectionGames'
import PopularLists from './HomeComponents/PopularLists'

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 10px;
  padding-top: 80px;
`

function HomePage() {
  const { t } = useTranslation()
  document.title = 'MyPlayLog - ' + t('home')
  const [latestGames, setLatestGames] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    //Récuperer les objets si stockés dans le storage
    const latestGames = localStorage.getItem('latestGames')
    const upcomingGames = localStorage.getItem('upcomingGames')
    const expirationDate = localStorage.getItem('expirationDate')

    if (
      latestGames &&
      upcomingGames &&
      expirationDate &&
      new Date() < new Date(expirationDate)
    ) {
      setLatestGames(JSON.parse(latestGames))
      setUpcomingGames(JSON.parse(upcomingGames))
      setIsLoading(false)
    } else {
      axios
        .get(`${process.env.REACT_APP_IP_ADRESS}/api/games/latest`)
        .then((res) => {
          setLatestGames(res.data[0].result)
          setUpcomingGames(res.data[1].result)
          const expiration = new Date()
          expiration.setHours(expiration.getHours() + 12) // expiration dans 12 heures
          localStorage.setItem(
            'latestGames',
            JSON.stringify(res.data[0].result)
          )
          localStorage.setItem(
            'upcomingGames',
            JSON.stringify(res.data[1].result)
          )
          localStorage.setItem('expirationDate', expiration)
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeWrapper>
      <Suspense fallback="loading">
        <div className=" text-white font-bold text-base text-center">
          <h1>{t('welcome_to_home_page')}</h1>
        </div>
        <GamesSections
          games={latestGames}
          nameSection={'trending'}
          isLoading={isLoading}
        />
        <div className="mb-4" />

        <div className="w-full ">
          <PopularLists />
        </div>
        <div className="mb-4" />

        <GamesSections
          games={upcomingGames}
          nameSection={'upcoming'}
          isLoading={isLoading}
        />

        <div className="w-full ">
          <SelectionGames />
        </div>
      </Suspense>
    </HomeWrapper>
  )
}
export default HomePage
