import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'

import colors from '../../utils/style/colors'
import RelatedGame from '../../components/RelatedContent/RelatedGame/RelatedGame'
import { useTranslation } from 'react-i18next'
import { Loader } from '../../utils/Atoms'
import FilterList from './FilterList'
import PopUpDeleteList from '../EditList/PopUpDeleteList'
import ListInteractions from './ListInteractions'
import ErrorOccured from '../../components/ErrorOccured/ErrorOccured'

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  padding-top: 80px;
`

export default function ListPage(props) {
  const { t, i18n } = useTranslation()
  const { listId } = useParams()
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setProgress(20)
    axios
      .get(`http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/${listId}`)
      .then((response) => {
        setList(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        console.log(error)
        setLoading(false)
      })
      .finally(() => setProgress(100))
  }, [listId])

  if (loading) {
    return (
      <PageWrapper className="flex w-full justify-center items-center">
        <LoadingBar
          color={colors.primary}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Loader />
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <div>
        <ErrorOccured errorMessage={error.message} />
      </div>
    )
  }

  return (
    <PageWrapper>
      <LoadingBar
        color={colors.primary}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {list ? (
        <div className="flex flex-col">
          <div className=" flex flex-row text-start my-35 w-full items-end">
            <h1 className="text-3xl">
              {list.name}
              <span className="text text-sm font-light ">
                ({list.ranked ? 'RANKED' : 'CLASSIC'})
              </span>
            </h1>
            <Link
              to={`/list/${listId}/edit`}
              className="p-2 ml-2 px-2 bg-[#FCD500] mt-2 hover:text-[#110f32] btn-save-list hover:bg-[#FCD800] text-[#110f32] border-none cursor-pointer max-w-fit"
            >
              EDIT
            </Link>
            <div className="max-w-fit max-h-fit">
              <PopUpDeleteList listId={listId} navigate={navigate} />
            </div>
          </div>
          <div className="w-full text-start ">
            <p className="  text-base">{list.description}</p>
          </div>
          <div className="w-full flex flex-row gap-2 mt-2 items-end">
            {list.tags.length > 0 && (
              <>
                {list.tags.map((tag) => {
                  return (
                    <Link
                      key={tag.tag}
                      to={`/lists?q=${tag.tag}`}
                      className="rounded-xl border text-xs border-solid border-white text-white hover:bg-white hover:text-[#110f32] p-1 px-2 hover:"
                    >
                      {tag.tag}
                    </Link>
                  )
                })}
              </>
            )}
          </div>

          <div className="flex flex-col  flex-wrap gap-4  items-center md:items-start  md:flex-row ">
            <div className="flex flex-wrap flex-row  w-full flex-1 ">
              <div className="flex flex-col w-full flex-1 items-end">
                <FilterList
                  games={list.games}
                  setList={setList}
                  isRanked={list.ranked}
                  setProgress={setProgress}
                />
                <div
                  className="flex flex-wrap flex-row p-4 rounded-xl w-full flex-1 justify-center xl:justify-start  "
                  style={{
                    backgroundColor: colors.backgroundDerivation,
                    boxShadow: 'inset 0 3px 15px 3px #0009',
                  }}
                >
                  {' '}
                  {list.games.map((game) => (
                    <div key={game.id}>
                      <RelatedGame game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col max-w-fit  items-center mr-8 sticky top-20 h-fit  overflow-y-auto">
              <img
                alt="profilePicture"
                className=" w-20 h-20 rounded-full"
                src="https://yt3.googleusercontent.com/ytc/AL5GRJV2zd0nD_mcf5rNGqyklKjB9wAGUws5lI60m_XUvg=s900-c-k-c0x00ffffff-no-rj"
              />
              <h4 className="text ">Liste de</h4>
              <h2>{list.idOwner}</h2>
              <button
                className="p-2 px-4 rounded-xl border-3 bg-transparent hover:cursor-pointer w-full hover:bg-[#fdc500]  text-[#fdc500] hover:text-white"
                style={{
                  borderColor: colors.primary,
                  textShadow: '1px 1px 2px black',
                }}
              >
                <span className=" font-bold">Suivre</span>
              </button>

              <h3 className="mt-2">
                <span style={{ color: colors.primary }}>
                  {list.games.length}{' '}
                </span>
                jeux.
              </h3>
              <span className="w-2/3  border-1 mt-2" />

              <ListInteractions
                list={list}
                setList={setList}
                setProgress={setProgress}
              />
              <span className="w-2/3 border border-solid border-1 mt-3 mb-2 " />

              <h4 className="text text-sm font-light ">Created :</h4>
              <h4 className="text text-sm font-normal ">
                {new Intl.DateTimeFormat(i18n.language, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(list.createdAt))}
              </h4>

              <span className="w-2/3 border border-solid border-1 my-2 " />

              {list.lastUpdate && (
                <>
                  <h4 className="text text-sm font-light ">Last update :</h4>
                  <h4 className="text text-sm font-normal ">
                    {new Intl.DateTimeFormat(i18n.language, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(list.lastUpdate))}
                  </h4>
                </>
              )}
              <span className="w-2/3 border border-solid border-1 my-2 " />

              <>
                <h4 className="text text-sm font-light ">
                  Liste vue {list.views} fois
                </h4>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div>Aucune liste trouvée.</div>
      )}
    </PageWrapper>
  )
}
