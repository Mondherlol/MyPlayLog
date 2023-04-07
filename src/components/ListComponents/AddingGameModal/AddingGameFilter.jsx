import React, { useEffect, useState } from 'react'
import { ConfigProvider, Input, Radio, Space } from 'antd'
import colors from '../../../utils/style/colors'
const { Search } = Input

export default function AddingGameFilter({ lists, setFilteredLists }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    const filteredList = lists.filter((list) => {
      const name = list.name.toLowerCase().includes(searchTerm.toLowerCase())
      const rank =
        filter === 'all'
          ? true
          : filter === 'ranked'
          ? list.ranked
          : !list.ranked
      return name && rank
    })
    setFilteredLists(filteredList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filter])

  return (
    <div className="flex flex-col gap-2">
      <ConfigProvider
        theme={{
          token: {
            colorTextPlaceholder: 'grey',
          },
        }}
      >
        <Search
          id="search"
          type="text"
          placeholder="Chercher une liste ou un top..."
          value={searchTerm}
          onChange={handleSearch}
          // onSearch={handleSubmit}
          allowClear
          size="large"
        />
      </ConfigProvider>
      <div className="flex flex-row">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colors.primary,
              colorPrimaryHover: colors.primary,
              colorText: 'white',
              colorTextDisabled: 'grey',
            },
          }}
        >
          <Radio.Group
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <Space direction="horizontal">
              <Radio value="all">Tous</Radio>
              <Radio value="classic">Classiques</Radio>
              <Radio value="ranked">Ranked</Radio>
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
