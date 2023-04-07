import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ErrorOccured({ errorMessage = '' }) {
  const { t } = useTranslation()
  return (
    <div className=" h-screen w-full flex justify-center text-center items-center flex-col ">
      <h1 className=" text-red-600">
        {errorMessage !== '' ? errorMessage : t('an_error_occured')}
      </h1>

      <h2>{t('please_try_again_later')}</h2>
      <button
        className=" mt-2 cursor-pointer  bg-transparent underline border-none text-yellow-400"
        onClick={() => {
          window.location.reload(false)
        }}
      >
        {t('refresh')} ?
      </button>
    </div>
  )
}
