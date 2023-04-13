import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ListCard from '../../ExploreLists/ListCard'
import ListCardPlaceholder from '../../ExploreLists/ListCardPlaceholder'
import colors from '../../../utils/style/colors'

export default function PopularLists() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [lists, setLists] = useState([])

  const getLists = () => {
    setIsLoading(true)

    const popular = localStorage.getItem('popularLists')
    const expirationDate = localStorage.getItem('expirationDate')
    if (popular && expirationDate && new Date() < new Date(expirationDate)) {
      setLists(JSON.parse(popular))
      setIsLoading(false)
    } else {
      let uri = `${process.env.REACT_APP_IP_ADRESS}/api/lists/?limit=3&sort=likesCount&order=desc
      `
      axios
        .get(uri.trim())
        .then((res) => {
          setLists(res.data.lists)
          localStorage.setItem('popularLists', JSON.stringify(res.data.lists))
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  useEffect(() => {
    if (lists === undefined || lists.length === 0) getLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className=" w-full">
      <div className="games">
        <h3>
          {i18next.language === 'en' ? (
            <>
              {t('popular')}{' '}
              <span className="title-highlight">{t('lists')}</span>
            </>
          ) : (
            <>
              <span className="title-highlight">{t('lists')}</span>{' '}
              {t('popular')}
            </>
          )}
        </h3>
        <div className="w-full flex flex-row overflow-auto gap-2 p-2  scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]">
          {lists &&
            !isLoading &&
            lists.map((list) => {
              return <ListCard list={list} key={list._id} />
            })}
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <ListCardPlaceholder key={'list + ' + index} />
            ))}
        </div>
        <Link style={{ color: colors.primary }} to="/lists">
          {t('show_more')}
        </Link>
      </div>
    </div>
  )
}
