import React from 'react'
import { Button, Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

var tabchecked = []

export default function FilterElements({
  elements,
  elementName,
  filters,
  setFilters,
}) {
  const { t } = useTranslation()
  useEffect(() => {
    tabchecked = [...filters]
  }, [filters])
  const [showElements, setShowElements] = useState(false)

  const onChangeChecked = (checkedValues) => {
    console.log('checked = ', checkedValues)
    if (checkedValues.target.checked) {
      if (tabchecked.indexOf(checkedValues.target.value) === -1) {
        tabchecked.push(checkedValues.target.value)
        setFilters([...tabchecked])
      }
    } else {
      const index = tabchecked.indexOf(checkedValues.target.value)
      if (index > -1) {
        tabchecked.splice(index, 1)
      }
      setFilters([...tabchecked])
    }
  }

  return (
    <>
      {elements.slice(0, showElements ? undefined : 4).map((v) => {
        return (
          <div key={v.name}>
            <Checkbox
              key={elementName + '=' + v.id}
              value={elementName + '=' + v.id}
              checked={filters.includes(elementName + '=' + v.id)}
              onChange={onChangeChecked}
              className="text-white"
            >
              {t(v.name)}
            </Checkbox>{' '}
            <br />
          </div>
        )
      })}
      {elements.length > 5 && (
        <Button
          type="text"
          className="bold text-blue-500"
          onClick={() => setShowElements(!showElements)}
        >
          {showElements ? 'Show Less <' : 'Show More >'}
        </Button>
      )}
    </>
  )
}
