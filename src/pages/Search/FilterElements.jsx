import React from 'react'
import { Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import colors from '../../utils/style/colors'

var tabchecked = []

export default function FilterElements({
  elements,
  elementName,
  filters,
  setFilters,
}) {
  const { t } = useTranslation()
  useEffect(() => {
    // const stock = filters.map((filter) => {
    //   const [key, value] = filter.value.split('=')
    //   const name = elements.find((e) => e.id.toString() === value)?.name || ''
    //   return { value: filter.value, name }
    // })
    // console.log('stock')
    // console.log(stock)
  }, [])
  useEffect(() => {
    // console.log(filters);
    tabchecked = [...filters]
  }, [filters])

  const [showElements, setShowElements] = useState(false)

  const onChangeChecked = (checkedValues, name) => {
    console.log('checked = ', checkedValues.target.value)
    if (checkedValues.target.checked) {
      if (
        tabchecked.findIndex(
          (filter) => filter.value === checkedValues.target.value
        ) === -1
      ) {
        tabchecked.push({ value: checkedValues.target.value, name: name })
        setFilters([...tabchecked])
      }
    } else {
      const index = tabchecked.findIndex(
        (filter) => filter.value === checkedValues.target.value
      )
      if (index > -1) {
        tabchecked.splice(index, 1)
      }
      setFilters([...tabchecked])
    }
    console.log(tabchecked)
  }

  return (
    <>
      {elements.slice(0, showElements ? undefined : 4).map((v) => {
        return (
          <div key={v.name}>
            <Checkbox
              key={elementName + '=' + v.id}
              value={elementName + '=' + v.id}
              checked={filters.some(
                (filter) => filter.value === elementName + '=' + v.id
              )}
              onChange={(e) =>
                onChangeChecked(
                  e,
                  elementName === 'platforms'
                    ? v.abbreviation
                      ? v.abbreviation
                      : v.name
                    : t(v.slug ? v.slug : v.name)
                )
              }
              className="text-white"
            >
              {elementName === 'platforms'
                ? v.abbreviation
                  ? v.abbreviation
                  : v.name
                : t(v.slug ? v.slug : v.name)}
            </Checkbox>{' '}
            <br />
          </div>
        )
      })}
      {elements.length > 5 && (
        <button
          type="text"
          className="bold   bg-transparent border-none cursor-pointer mb-2"
          style={{ color: colors.primary }}
          onClick={() => setShowElements(!showElements)}
        >
          {showElements ? `${t('show_less')} -` : `${t('show_more')} ›`}
        </button>
      )}
    </>
  )
}
