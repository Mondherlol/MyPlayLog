import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { useState, useEffect } from 'react'
import './../ListPage/FilterList.css'
import { useTranslation } from 'react-i18next'

export default function SortingLists({
  sortBy,
  setSortBy,
  setSortOrder,
  sortOrder,
  setSortQuery,
}) {
  const [currentSort, setCurrentSort] = useState('Name')
  const { t } = useTranslation()

  const items = [
    {
      key: 'name',
      label: t('name'),
    },
    {
      key: 'lastUpdate',
      label: t('last_update'),
    },
    {
      key: 'likesCount',
      label: t('sort_likes'),
    },
  ]
  useEffect(() => {
    setSortQuery(`&sort=${sortBy}&order=${sortOrder}`)
    setCurrentSort(
      sortBy === 'name'
        ? t('name')
        : sortBy === 'lastUpdate'
        ? t('last_update')
        : t('sort_likes')
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder])

  const handleSort = (sortBy) => {
    setSortBy(sortBy)
  }

  const handleSortOrder = (order) => {
    setSortOrder(order)
  }
  const onClick = ({ key }) => {
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
        <div className="arrow" onClick={() => handleSortOrder('desc')}>
          <div
            className="arrow-head"
            style={{
              borderBottom: `4px solid ${
                sortOrder === 'desc' ? '#FCD500' : 'white'
              }`,
            }}
          ></div>
          <div
            className="arrow-body"
            style={{
              backgroundColor: ` ${sortOrder === 'desc' ? '#FCD500' : 'white'}`,
            }}
          ></div>
        </div>

        <div className="arrow" onClick={() => handleSortOrder('asc')}>
          <div
            className="arrow-body"
            style={{
              backgroundColor: ` ${sortOrder === 'asc' ? '#FCD500' : 'white'}`,
            }}
          ></div>{' '}
          <div
            className="down-arrow-head"
            style={{
              borderTop: `4px solid ${
                sortOrder === 'asc' ? '#FCD500' : 'white'
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
