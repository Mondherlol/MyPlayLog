import { useTranslation } from 'react-i18next'
import colors from '../../../../utils/style/colors'
import styled from 'styled-components'

import { useState } from 'react' // Import useState hook
const StyledTitle = styled.h1`
  background: rgba(217, 217, 217, 0.2);
  padding: 5px;
  padding-left: 10%;
  padding-right: 10%;
  border-radius: 8px;
  border-color: ${colors.backgroundDerivation};
`

const Language = styled.td`
  padding-left: 10px;
`

const StyledTd = styled.td`
  color: ${colors.primary};
  font-weight: bold;
  padding: 8px;
`

const StyledButton = styled.button`
  color: ${colors.primary};
  background: none;
  cursor: pointer;
  border: none;
`
function LanguageSupport({ language_supports }) {
  const { t } = useTranslation()
  const supportByLanguage = {}

  // Boucler sur chaque objet dans language_supports
  for (const obj of language_supports) {
    const { language, language_support_type } = obj
    const { locale } = language
    // Si nous n'avons pas encore rencontré cette langue, initialiser ses informations de support
    if (!supportByLanguage[locale]) {
      supportByLanguage[locale] = {
        code: locale,
        support_type_1: false,
        support_type_2: false,
        support_type_3: false,
      }
    }

    // Mettre à jour les informations de support pour cette langue
    const supportType = `support_type_${language_support_type.id}`
    supportByLanguage[locale][supportType] = true
  }

  // Créer un tableau à partir des informations de support par langue
  const languageSupportArray = Object.values(supportByLanguage)

  // Use useState hook to keep track of the number of rows to show
  const [numRowsToShow, setNumRowsToShow] = useState(5)

  // Function to handle button click and update the number of rows to show
  const handleShowMoreClick = () => {
    setNumRowsToShow(
      numRowsToShow === languageSupportArray.length
        ? 5
        : languageSupportArray.length
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <StyledTitle className="  border-b-4 w-fit    border-0  border-solid  ">
        {t('language_support')}
      </StyledTitle>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.34' }}>
            <th></th>
            <th className=" p-2">{t('audio')}</th>
            <th className=" p-2">{t('subtitles')}</th>
            <th className=" p-2">{t('interface')}</th>
          </tr>
          {/* Use slice method to show only the first numRowsToShow rows */}
          {languageSupportArray.slice(0, numRowsToShow).map((language) => {
            return (
              <tr
                key={language.code}
                style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.34' }}
              >
                <Language className=" pr-2 "> {t(language.code)}</Language>
                <StyledTd className=" pr-2 pl-2 text-center">
                  {' '}
                  {language.support_type_1 ? '✓' : ''}{' '}
                </StyledTd>
                <StyledTd className=" pr-2 pl-2 text-center">
                  {' '}
                  {language.support_type_2 ? '✓' : ''}{' '}
                </StyledTd>
                <StyledTd className=" pr-2 pl-2 text-center">
                  {' '}
                  {language.support_type_3 ? '✓' : ''}{' '}
                </StyledTd>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* Show button to display more rows if there are more than 5 rows */}
      {languageSupportArray.length > 5 && (
        <StyledButton onClick={handleShowMoreClick}>
          {numRowsToShow === 5
            ? t('show_x_more_languages', {
                number: languageSupportArray.length - numRowsToShow,
              })
            : t('show_less')}
        </StyledButton>
      )}
    </div>
  )
}
export default LanguageSupport
