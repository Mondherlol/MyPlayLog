import { AutoComplete, Input } from 'antd'
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import colors from '../../utils/style/colors'

export default function ListSearchGameToAdd({ listId, list, setList }) {
  const [options, setOptions] = useState([])
  const [results, setResults] = useState([])
  const [selectedGame, setSelectedGame] = useState({})
  const [progress, setProgress] = useState(0)

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
            url: `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/game?ids=${id}`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: { ...data },
          }
          axios(config)
            .then((res) => {
              setProgress(80)
              console.log(res)
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
            .catch((err) => console.log(err))
            .finally(() => setProgress(100))
        }
      } else {
        console.log('Game already in list.')
      }
      setSelectedGame({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame])

  const handleSearch = debounce((value) => {
    if (value.length > 2) searchGame(value)
  }, 500)

  const onSelect = (value) => {
    console.log('onSelect', value)
    const game = results.find((g) => g.slug === value)
    setSelectedGame(game)
  }
  function searchGame(name) {
    if (name && name !== '') {
      setProgress(10)

      axios
        .get(
          `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/games/search/light/${name}`
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
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        notFoundContent={'Pas de résultat !'}
      >
        <Input.Search size="large" enterButton placeholder="Search any game" />
      </AutoComplete>
    </>
  )
}
