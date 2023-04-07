import colors from '../../utils/style/colors'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
const CreditsWrapper = styled.div`
  min-height: 120vh;
  background-color: ${colors.background};
  padding-top: 80px;
  color: white;
  display: block;
  text-align: center;
`
const CreditLink = styled.a`
  color: a;
`
function Credits() {
  const { t } = useTranslation()
  document.title = 'Credits'
  return (
    <CreditsWrapper>
      <h1>Credits.</h1>
      <br />
      {t('icons_made_by')}
      <ul>
        <li>
          <CreditLink
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
          >
            Smashicon
          </CreditLink>{' '}
          ,
        </li>
        <li>
          <CreditLink
            href="https://www.flaticon.com/authors/th-studio"
            title="th studio"
          >
            {' '}
            Th studio{' '}
          </CreditLink>
          ,
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
          >
            {' '}
            Pixel perfect{' '}
          </a>
          ,
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/lizel-arina"
            title="Lizel Arina"
          >
            {' '}
            Lizel Arina{' '}
          </a>
          ,
        </li>

        <li>
          <a href="https://www.freepik.com" title="Freepik">
            {' '}
            Freepik{' '}
          </a>{' '}
          ,
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/riajulislam"
            title="riajulislam"
          >
            {' '}
            riajulislam{' '}
          </a>
          ,
        </li>
      </ul>
      {t('from') + ' '}
      <CreditLink href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </CreditLink>
    </CreditsWrapper>
  )
}
export default Credits
