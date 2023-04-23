import React from 'react'
import styled from 'styled-components'
import colors from '../../../../../utils/style/colors'
import ListCard from '../../../../ExploreLists/ListCard'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
const StyledSpan = styled.span`
  color: ${colors.primary};
`

export default function UserOverview({ user, userLists, setActiveTabIndex }) {
  const { t } = useTranslation()
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const oneDay = 24 * 60 * 60 * 1000 // Nombre de millisecondes dans un jour
  const createdAt = new Date(user.createdAt)
  const today = new Date()
  const diffDays = Math.round(Math.abs((createdAt - today) / oneDay))

  const formattedDate = new Intl.DateTimeFormat(
    i18next.language,
    options
  ).format(createdAt)

  return (
    <div className="w-full flex flex-row  justify-center mb-4 flex-wrap gap-2  p-4">
      <div className=" w-64 flex flex-col ">
        <div
          style={{ backgroundColor: colors.backgroundDerivation }}
          className="rounded w-full h-fit p-4 flex flex-col gap-2"
        >
          <h3 className=" break-words">
            {t('about_user')} <StyledSpan>{user.username}</StyledSpan>{' '}
          </h3>
          {user.bio && (
            <>
              <h4>Bio</h4>
              <p className=" break-words ">{user.bio}</p>
            </>
          )}

          <p>
            {t('member_for')}{' '}
            <span style={{ color: colors.primary }}>{diffDays}</span>{' '}
            {t('days')}
          </p>
          <p>
            {t('joined')} :{' '}
            <strong style={{ color: colors.primary }}>{formattedDate}</strong>{' '}
          </p>
          <p>
            <StyledSpan>{user.lists.length}</StyledSpan> {t('lists_created')}.
          </p>
        </div>
      </div>
      <div className="flex-1 h-fit" style={{ minWidth: 300 }}>
        <h2>{t('latest_lists')} :</h2>
        <div className=" mt-2 grid grid-cols-1 xl:grid-cols-2 gap-2 flex-wrap">
          {userLists &&
            userLists.map((list) => {
              return <ListCard list={list} key={list._id} />
            })}
        </div>
        <button
          onClick={() => setActiveTabIndex(1)}
          style={{ color: colors.primary }}
          className="cursor-pointer border-none bg-transparent p-4"
        >
          {t('see_all_lists')} →
        </button>
      </div>
    </div>
  )
}
