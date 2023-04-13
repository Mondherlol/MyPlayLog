import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ErrorFr from '../../assets/images/error-fr.png'
import ErrorEn from '../../assets/images/error-en.png'
import i18next from 'i18next'
import { Link } from 'react-router-dom'

import './Error.scss'

const ErrorWrapper = styled.div`
  // display: flex;
  // justify-content: ;
  background-color: #110f32;
  font-family: 'VT323', monospace!important;

  min-height: 100vh;
  background-color:black;
  width:100%:
  position:relative;
`

function ErrorPage() {
  const { t } = useTranslation()
  document.title = t('error') + ' - ' + t('this_page_does_not_exist')
  return (
    <ErrorWrapper className="error-wrapper pt-20 xl:pt-0 ">
      <div className="codec">
        <div className="flex flex-col w-full justify-center items-cente relative">
          <img
            alt="error"
            src={i18next.language === 'fr' ? ErrorFr : ErrorEn}
            className=" w-full  "
          />
          <div className="w-full md:absolute  md:bottom-14 xl:bottom-24 items-center justify-center flex">
            <Link
              to="/"
              className="   text-center text-[#3bcb86] hover:text-white border border-[#3bcb86] hover:border-[#3d7f7d]  border-solid  p-2 "
              style={{ fontFamily: "'VT323', monospace!important" }}
            >
              {t('go_backwards')}
            </Link>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  )
}
export default ErrorPage
