import { useState, useEffect } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'antd'

import france from '../../assets/icons/flags/france.png'
import usa from '../../assets/icons/flags/usa.png'

const items = [
  {
    label: 'English',
    key: 'en',
    icon: <img src={usa} style={{ width: 25 }} alt="usa_flag" />,
  },
  {
    label: 'Français',
    key: 'fr',
    icon: <img src={france} style={{ width: 25 }} alt="france_flag" />,
  },
]

function SelectLanguage() {
  const changeLanguage = (e) => {
    i18next.changeLanguage(e.key)
    setLanguage(e.key) // mettre à jour l'état avec la nouvelle langue sélectionnée
  }
  const menuProps = {
    items,
    onClick: changeLanguage,
  }
  useEffect(() => {
    setLanguage(i18next.language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18next.language])

  const [currentLanguage, setLanguage] = useState(i18next.language) // état local pour stocker la langue actuelle
  const { t } = useTranslation()

  return (
    <Dropdown.Button
      style={{
        marginLeft: '15px',
        marginRight: 'auto',
      }}
      menu={menuProps}
      placement="bottom"
      icon={
        <img
          src={currentLanguage === 'fr' ? france : usa}
          style={{ width: 20 }}
          alt="language_icon"
        />
      }
    >
      {t('language')}
    </Dropdown.Button>
  )
}
export default SelectLanguage
