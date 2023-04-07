import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { useState, useEffect } from 'react'
import './FilterList.css'

export default function FilterList({ setList, isRanked, setProgress }) {
  const [sortBy, setSortBy] = useState(isRanked ? 'rank' : 'dateAdded')
  const [currentSort, setCurrentSort] = useState('Date added')
  const [sortOrder, setSortOrder] = useState('desc')

  const items = isRanked
    ? [
        {
          key: 'rank',
          label: 'Rank',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'dateAdded',
          label: 'Date added',
        },
        {
          key: 'releaseDate',
          label: 'Release Date',
        },
        {
          key: 'rating',
          label: 'Rating',
        },
      ]
    : [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'dateAdded',
          label: 'Date added',
        },
        {
          key: 'releaseDate',
          label: 'Release Date',
        },
        {
          key: 'rating',
          label: 'Rating',
        },
      ]

  useEffect(() => {
    if (sortBy === 'name') {
      setList((list) => ({ ...list, games: sortByName(list.games, sortOrder) }))
      setCurrentSort('Name')
    } else if (sortBy === 'releaseDate') {
      setList((list) => ({
        ...list,
        games: sortByReleaseDate(list.games, sortOrder),
      }))
      setCurrentSort('Release Date')
    } else if (sortBy === 'dateAdded') {
      setList((list) => ({
        ...list,
        games: sortByDateAdded(list.games, sortOrder),
      }))
      setCurrentSort('Date added')
    } else if (sortBy === 'rating') {
      setList((list) => ({
        ...list,
        games: sortByRating(list.games, sortOrder),
      }))
      setCurrentSort('Rating')
    } else if (sortBy === 'rank') {
      setList((list) => ({
        ...list,
        games: sortByRank(list.games, sortOrder),
      }))
      setCurrentSort('Rank')
    }
    setProgress(100)
  }, [sortBy, sortOrder, setList])

  const sortByName = (games, sortOrder) => {
    if (sortOrder === 'desc') {
      return games.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      return games.sort((a, b) => b.name.localeCompare(a.name))
    }
  }

  const sortByReleaseDate = (games, sortOrder) => {
    if (sortOrder === 'desc') {
      return games.sort((a, b) => a.first_release_date - b.first_release_date)
    } else {
      return games.sort((a, b) => b.first_release_date - a.first_release_date)
    }
  }
  const sortByDateAdded = (games, sortOrder) => {
    if (sortOrder === 'desc') {
      return games.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt))
    } else {
      return games.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    }
  }
  const sortByRank = (games, sortOrder) => {
    if (sortOrder === 'desc') {
      return games.sort((a, b) => a.rank - b.rank)
    } else {
      return games.sort((a, b) => b.rank - a.rank)
    }
  }

  const sortByRating = (games, sortOrder) => {
    const getAverage = (game) => {
      if (game.rating && game.aggregated_rating) {
        return (game.rating + game.aggregated_rating) / 2
      } else if (game.rating) {
        return game.rating
      } else if (game.aggregated_rating) {
        return game.aggregated_rating
      } else {
        return -Infinity // pour placer les jeux sans évaluation en dernier
      }
    }

    if (sortOrder === 'asc') {
      return games.sort((a, b) => getAverage(a) - getAverage(b))
    } else {
      return games.sort((a, b) => getAverage(b) - getAverage(a))
    }
  }

  const handleSort = (sortBy) => {
    setSortBy(sortBy)
  }

  const handleSortOrder = (order) => {
    setProgress(20)

    setSortOrder(order)
  }
  const onClick = ({ key }) => {
    setProgress(20)
    handleSort(key)
  }
  return (
    <div className="flex flex-row">
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        onClick={({ key }) => console.log(key)}
      >
        <h2 className="text-white font-normal hover:text-yellow-500  cursor-pointer">
          <Space>
            {currentSort}
            <DownOutlined />
          </Space>
        </h2>
      </Dropdown>

      <div className="arrow-wrapper">
        <div className="arrow" onClick={() => handleSortOrder('asc')}>
          <div
            className="arrow-head"
            style={{
              borderBottom: `4px solid ${
                sortOrder === 'asc' ? '#FCD500' : 'white'
              }`,
            }}
          ></div>
          <div
            className="arrow-body"
            style={{
              backgroundColor: ` ${sortOrder === 'asc' ? '#FCD500' : 'white'}`,
            }}
          ></div>
        </div>

        <div className="arrow" onClick={() => handleSortOrder('desc')}>
          <div
            className="arrow-body"
            style={{
              backgroundColor: ` ${sortOrder === 'desc' ? '#FCD500' : 'white'}`,
            }}
          ></div>{' '}
          <div
            className="down-arrow-head"
            style={{
              borderTop: `4px solid ${
                sortOrder === 'desc' ? '#FCD500' : 'white'
              }`,
            }}
          >
            {' '}
          </div>
        </div>
      </div>
    </div>
  )
}
