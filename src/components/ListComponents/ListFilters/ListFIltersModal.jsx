import { Button, Modal } from 'antd'
import ListFilters from './ListFilters'
import React from 'react'

import './ListFilters.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Radio, ConfigProvider, Space } from 'antd'
import styled from 'styled-components'
import colors from '../../../utils/style/colors'

const { Search } = Input

const FilterContainer = styled.div`
  background-color: ${colors.backgroundDerivation};
  border-radius: 16px;
  min-width: 250px;
`

export default function ListFIltersModal({
  isFilterModalVisible,
  setIsFilterModalVisible,
  ranked,
  query,
  setIsModalOpen,
  sortQuery,
}) {
  const handleCancel = () => {
    setIsFilterModalVisible(false)
  }
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [filterChanged, setFilterChanged] = useState(false)

  //Mettre les filtres définis dans l'url (si y en a )
  useEffect(() => {
    setSearchTerm(query)
    setFilter(
      ranked === 'true' ? 'ranked' : ranked === 'false' ? 'classic' : 'all'
    )
  }, [query, ranked])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilterChanged(true)
  }

  const handleSubmit = (e) => {
    const localRanked =
      filter !== 'all' ? (filter === 'ranked' ? true : false) : undefined
    const localQuery = []

    if (searchTerm !== null && searchTerm !== '') {
      localQuery.push(`q=${searchTerm.trim()}`)
    }

    if (localRanked !== undefined) {
      localQuery.push(`ranked=${localRanked}`)
    }
    localQuery.push(sortQuery)

    const queryString = localQuery.length > 0 ? `?${localQuery.join('&')}` : ''

    const link = `/lists${queryString}`
    navigate(link)
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    setFilterChanged(false)
    setIsFilterModalVisible(false)
  }

  useEffect(() => {
    if (filterChanged) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterChanged])

  const clearFilters = (e) => {
    e.preventDefault()
    setSearchTerm('')
    setFilter('all')
    setFilterChanged(true)
  }
  return (
    <>
      <Modal
        className="listFilterModal"
        title="List filters"
        open={isFilterModalVisible}
        onCancel={handleCancel}
        style={{ minWidth: 300 }}
        footer={[
          <button
            type="button"
            onClick={(e) => clearFilters(e)}
            style={{ backgroundColor: colors.danger }}
            className="text-white p-2  border-none mr-2 rounded-md hover:cursor-pointer"
          >
            Clear Filters
          </button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <FilterContainer className="flex flex-col h-full px-4 py-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                style={{ color: colors.primary }}
                className="block font-bold mb-2"
                htmlFor="search"
              >
                Rechercher
              </label>
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
                  placeholder="Nom, tag ..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onSearch={handleSubmit}
                  allowClear
                  size="large"
                />
              </ConfigProvider>
            </div>
            <div>
              <label
                style={{ color: colors.primary }}
                className="block font-bold mb-2"
                htmlFor="search"
              >
                Type
              </label>
              <div className="mt-2">
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
                  <Radio.Group onChange={handleFilterChange} value={filter}>
                    <Space direction="vertical">
                      <Radio value="all">Tous</Radio>
                      <Radio value="classic">Classiques</Radio>
                      <Radio value="ranked">Ranked</Radio>
                    </Space>
                  </Radio.Group>
                </ConfigProvider>
              </div>
            </div>
          </form>
        </FilterContainer>
      </Modal>
    </>
  )
}
