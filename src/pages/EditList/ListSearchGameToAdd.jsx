import { AutoComplete, Input } from 'antd'
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import colors from '../../utils/style/colors'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'

export default function ListSearchGameToAdd({ listId, list, setList }) {
  const [options, setOptions] = useState([])
  const [results, setResults] = useState([])
  const [selectedGame, setSelectedGame] = useState({})
  const [progress, setProgress] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    if (selectedGame && selectedGame !== {} && selectedGame.id) {
      const isGameAlreadyInList = list.games.some(
        (game) => game.id_IGDB === selectedGame.id
      )
      if (!isGameAlreadyInList) {
        setProgress(50)

        const data = { id_IGDB: selectedGame.id }

        const id = listId
        if (id !== undefined) {
          const config = {
            method: 'post',
            url: `${process.env.REACT_APP_IP_ADRESS}/api/lists/game?ids=${id}`,
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
            data: { ...data },
          }
          axios(config)
            .then((res) => {
              setProgress(80)
              setList((prevState) => {
                let gameToAdd = { ...selectedGame }
                gameToAdd.id_IGDB = gameToAdd.id
                const gameIndex = prevState.games.findIndex(
                  (game) => game.id === gameToAdd.id
                )
                if (gameIndex === -1) {
                  return {
                    ...prevState,
                    games: [gameToAdd, ...prevState.games],
                  }
                }
                return prevState
              })
            })
            .catch((err) => {
              console.log(err)
              toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: 'dark',
              })
            })
            .finally(() => setProgress(100))
        }
      } else {
        toast.info(t('game_already_in_list'), {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
          autoClose: 3000,
        })
      }
      setSelectedGame({})
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame])

  function debounce(func, delay) {
    let timer
    let lastArgs
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timer)
      lastArgs = args
      timer = setTimeout(() => {
        func.apply(context, lastArgs)
      }, delay)
    }
  }

  const onSelect = (value) => {
    const game = results.find((g) => g.slug === value)
    setSelectedGame(game)
    setSearchValue('')
  }
  function searchGame(name) {
    if (name && name !== '') {
      setProgress(10)

      axios
        .get(
          `${process.env.REACT_APP_IP_ADRESS}/api/games/search/light/${name}`
        )
        .then((res) => setResults(res.data))
        .catch((err) => console.log(err))
        .finally(() => setProgress(100))
    }
  }

  useEffect(() => {
    if (results)
      setOptions(
        results.map((game) => {
          return {
            value: game.slug,
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div className="flex flex-row justify-start items-start gap-2">
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${
                      game.cover ? game.cover.image_id : 'undefined'
                    }.jpg`}
                    alt="zelda"
                    width={50}
                    height={65}
                  />

                  <div className=" flex flex-col flex-wrap">
                    <h4 className=" overflow-hidden text-ellipsis ">
                      {game.name}
                    </h4>
                    {game.first_release_date && (
                      <p>
                        {new Date(game.first_release_date * 1000).getFullYear()}
                      </p>
                    )}

                    <p className=" text-gray-500  text-xs">
                      {game.platforms &&
                        game.platforms
                          .map((platform) => {
                            return platform.abbreviation
                              ? platform.abbreviation
                              : platform.name
                          })
                          .join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ),
          }
        })
      )
  }, [results])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchValue)
      if (searchValue.length > 2) {
        searchGame(searchValue)
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  return (
    <>
      <LoadingBar
        color={colors.primary}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 300,
        }}
        value={searchValue}
        options={options}
        onSelect={onSelect}
        // onSearch={handleSearch}
        notFoundContent={'Pas de résultat !'}
      >
        <Input.Search
          size="large"
          placeholder={t('search_any_game')}
          onChange={(e) => {
            setSearchValue(e.target.value)
            // handleSearch(e.target.value)
          }}
        />
      </AutoComplete>
    </>
  )
}
