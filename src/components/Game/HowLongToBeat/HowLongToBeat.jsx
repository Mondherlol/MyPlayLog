import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import './HowLongToBeat.css'
import TimeIcon from '../../../assets/icons/time-icon.png'

const Container = styled.div`
  background: rgba(217, 217, 217, 0.2);
  border-radius: 8px;
`

function HowLongToBeat({ gameName, parentGameName }) {
  gameName = gameName.replaceAll('/', ' ')
  gameName = gameName.replaceAll(':', '')
  const [timeToBeat, setTimeToBeat] = useState({
    id: '0000',
    gameplayMain: 0,
    gameplayMainExtra: 0,
    gameplayCompletionist: 0,
  })
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    setLoading(true)
    const fetchTimeToBeat = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_IP_ADRESS}/api/timeToBeat/${gameName}`
        )
        if (res.data.length > 0) {
          setTimeToBeat(res.data[0])
          setLoading(false)
          return
        }
        // try with parentGameName if gameName returned no results
        if (parentGameName !== null) {
          const res2 = await axios.get(
            `${process.env.REACT_APP_IP_ADRESS}/api/timeToBeat/${parentGameName}`
          )
          if (res2.data.length > 0) {
            setTimeToBeat(res2.data[0])
          }
        } else {
        }
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchTimeToBeat()
  }, [gameName, parentGameName])

  const { t } = useTranslation()

  return isLoading ? (
    <div className="h-full loading"></div>
  ) : isError ? (
    <Container className="h-full flex flex-col justify-center items-center">
      <h1 className="  text-base font-normal text-yellow-500">
        {' '}
        {t('how_long_to_beat')}
      </h1>
      <h3>{t('an_error_occured')}</h3>
      <button
        className=" mt-2 cursor-pointer  bg-transparent underline border-none text-yellow-400"
        onClick={() => {
          window.location.reload(false)
        }}
      >
        {t('refresh')} ?
      </button>
    </Container>
  ) : (
    <Container className=" h-full flex flex-col">
      <div className="flex w-full text-center justify-center   ">
        <a
          target="blank"
          className="  text-base font-normal text-yellow-500 cursor-pointer hover:underline hover:text-yellow-400"
          href={`https://howlongtobeat.com/game/${timeToBeat.id}`}
        >
          {t('how_long_to_beat')}
        </a>
      </div>
      <div className="h-full flex-1 flex flex-row  ">
        <div className=" w-16 flex justify-top items-center  ">
          <img src={TimeIcon} alt="time-icon" className="w-11/12  pl-2  " />
        </div>
        <div className="  flex-1 justify-top items-center flex">
          <table className="  w-11/12 hltbTable">
            <tbody>
              <tr>
                <th>{t('main_story')}</th>
                <td>
                  <span>
                    {' '}
                    {timeToBeat.gameplayMain !== 0
                      ? timeToBeat.gameplayMain
                      : '--'}
                  </span>{' '}
                  {t('hours')}
                </td>
              </tr>
              <tr>
                <th> {t('main+extra')}</th>
                <td>
                  <span>
                    {' '}
                    {timeToBeat.gameplayMainExtra !== 0
                      ? timeToBeat.gameplayMainExtra
                      : '--'}
                  </span>{' '}
                  {t('hours')}
                </td>
              </tr>
              <tr>
                <th>{t('completionist')}</th>
                <td>
                  <span>
                    {' '}
                    {timeToBeat.gameplayCompletionist !== 0
                      ? timeToBeat.gameplayCompletionist
                      : '--'}
                  </span>{' '}
                  {t('hours')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default HowLongToBeat
