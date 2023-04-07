import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: ;
  background-color: #110f32;
  min-height: 100vh;
`
const ErrorMessage = styled.h2`
  color: white;
  font-weight: normal;
`
function ErrorPage() {
  const { t } = useTranslation()
  document.title = t('error') + ' - ' + t('this_page_does_not_exist')
  return (
    <ErrorWrapper>
      <ErrorMessage className="mx-auto my-auto">
        <strong className="text-red-600 font-extrabold	"> {t('error')} :</strong>
        <br />
        {t('this_page_does_not_exist')}
      </ErrorMessage>
    </ErrorWrapper>
  )
}
export default ErrorPage
