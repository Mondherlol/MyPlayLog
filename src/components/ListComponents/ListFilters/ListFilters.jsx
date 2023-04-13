import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Radio, ConfigProvider, Space } from 'antd'
import styled from 'styled-components'
import colors from '../../../utils/style/colors'
import { useTranslation } from 'react-i18next'

const { Search } = Input

const FilterContainer = styled.div`
  background-color: ${colors.backgroundDerivation};
  border-radius: 16px;
  min-width: 250px;
`

export default function ListFilters({ query, ranked, sortQuery }) {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [filterChanged, setFilterChanged] = useState(false)
  const { t } = useTranslation()

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
    <FilterContainer className="flex flex-col h-full px-4 py-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            style={{ color: colors.primary }}
            className="block font-bold mb-2"
            htmlFor="search"
          >
            {t('search')}
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
              placeholder={t('name_tag')}
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
            {t('type')}
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
                  <Radio value="all">{t('all')}</Radio>
                  <Radio value="classic">{t('classic')}</Radio>
                  <Radio value="ranked">{t('top')}</Radio>
                </Space>
              </Radio.Group>
            </ConfigProvider>

            <button
              type="button"
              onClick={(e) => clearFilters(e)}
              style={{ backgroundColor: colors.danger }}
              className="text-white p-2 w-full mt-2 border-none rounded-md hover:cursor-pointer"
            >
              {t('clear_filters')}
            </button>
          </div>
        </div>
      </form>
    </FilterContainer>
  )
}
