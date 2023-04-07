import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListSearchGameToAdd from './ListSearchGameToAdd'
import colors from '../../utils/style/colors'
import './EditsList.css'
import { Input, ConfigProvider, Radio } from 'antd'
import LoadingBar from 'react-top-loading-bar'

import { useTranslation } from 'react-i18next'
import { Loader } from '../../utils/Atoms'
import DragAndDropGames from './DragAndDropGames'
import EditListTags from './EditListTags'
import PopUpDeleteList from './PopUpDeleteList'

const { TextArea } = Input

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  padding-top: 80px;
  overflow: hidden;
`
const InputName = styled.input`
  width: 100%;
  padding: 10px 20px;
  // padding-left:10px;
  border-color: transparent;
  border-bottom: 1px solid darkgrey;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: bold;
  background: transparent;
  color: white;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    padding-left: 5px;
    font-size: 15px;
    color: rgb(255,255,255,0.8)
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    padding-left: 5px;
    font-size: 15px;
    color: rgb(255,255,255,0.8)
  }
  &:-ms-input-placeholder {
    padding-left: 5px;
    font-size: 15px;
    color: rgb(255,255,255,0.8)
      );
  }
  
`

export default function EditList() {
  const { t, i18n } = useTranslation()
  const { listId } = useParams()
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [isRanked, setIsRanked] = useState(false)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const navigate = useNavigate()
  const onPublicChange = (e) => {
    setIsPublic(e.target.value === 'public')
  }
  const onRankedChange = (e) => {
    setIsRanked(e.target.value === 'ranked')
    const updatedList = { ...list }
    updatedList.ranked = e.target.value === 'ranked'
    setList(updatedList)
  }

  useEffect(() => {
    setProgress(20)
    console.log(listId)
    axios
      .get(`http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/${listId}`)
      .then((response) => {
        setList(response.data)
        setLoading(false)
        setName(response.data.name)
        setDescription(
          response.data.description ? response.data.description : ''
        )
        setIsPublic(response.data.public)
        setIsRanked(response.data.ranked)
        setTags(response.data.tags)
      })
      .catch((error) => {
        setError(error)
        console.log(error)
        setLoading(false)
      })
      .finally(() => setProgress(100))
  }, [listId])

  const handleSaveList = () => {
    setProgress(10)
    const updatedList = { ...list }
    updatedList.name = name
    updatedList.public = isPublic
    updatedList.tags = tags
    updatedList.description = description

    // Remove Rank if classic
    if (!list.ranked) {
      updatedList.games = updatedList.games.map((game) => {
        const { rank, ...rest } = game
        return rest
      })
    } else {
      // Set the rank if ranked
      updatedList.games = updatedList.games.map((game, index) => {
        return {
          ...game,
          rank: index + 1,
        }
      })
    }

    console.log(updatedList)

    const config = {
      method: 'put',
      url: `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/${listId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: updatedList,
    }
    axios(config)
      .then((res) => {
        console.log(res)
        setProgress(100)
        navigate(`/list/${listId}`)
      })
      .catch((err) => console.log(err))
    setProgress(100)
  }

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
    return <div>Une erreur est survenue : {error.message}</div>
  }

  return (
    <PageWrapper>
      <LoadingBar
        color={colors.primary}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {list ? (
        <div className="flex flex-col gap-4">
          <div className=" text-start my-35 w-full">
            <label>List Name :</label>
            <InputName
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter List name"
            />
          </div>

          <div className="flex flex-row flex-wrap sm:flex-nowrap  justify-between  gap-2 ">
            <div
              className="p-4 rounded-xl flex pb-4 h-fit sticky top-20  flex-col"
              style={{
                backgroundColor: colors.backgroundDerivation,
              }}
            >
              <div
                className="flex flex-col gap-2  "
                style={{
                  minWidth: 300,
                  maxWidth: 300,
                }}
              >
                <label>Add Game</label>{' '}
                <ListSearchGameToAdd
                  listId={listId}
                  list={list}
                  setList={setList}
                />
                <label>Description</label>{' '}
                <ConfigProvider
                  theme={{
                    token: {
                      colorBgContainer: 'rgba(255, 255, 255, 0.9)',
                      colorText: 'black',
                      fontWeightStrong: 800,
                      colorBorder: 'transparent',
                      colorPrimaryBorderHover: colors.primary,
                      colorPrimaryHover: colors.primary,
                      colorTextPlaceholder: 'grey',
                      fontFamily: 'Inter',
                    },
                  }}
                >
                  <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    showCount
                    maxLength={300}
                    placeholder="Décrivez votre liste en quelques lignes."
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                    // status="error"
                    defaultValue={list.description}
                  />
                </ConfigProvider>
                <ConfigProvider
                  theme={{
                    token: {
                      fontWeightStrong: 800,
                      colorText: 'white',
                      colorBgBase: colors.backgroundDerivation,
                      colorBorder: 'white',

                      colorPrimary: colors.primary,
                      colorTextPlaceholder: 'grey',
                      fontFamily: 'Inter',
                    },
                  }}
                >
                  <div className="flex flex-col">
                    <label>VISIBILITY</label>
                    <Radio.Group
                      defaultValue={isPublic ? 'public' : 'private'}
                      buttonStyle="solid"
                      onChange={onPublicChange}
                    >
                      <Radio.Button
                        style={{ color: isPublic ? 'black' : 'white' }}
                        value="public"
                      >
                        Public
                      </Radio.Button>
                      <Radio.Button
                        style={{ color: !isPublic ? 'black' : 'white' }}
                        value="private"
                      >
                        Private
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="flex flex-col">
                    <label>TYPE</label>
                    <Radio.Group
                      defaultValue={isRanked ? 'ranked' : 'classic'}
                      buttonStyle="solid"
                      onChange={onRankedChange}
                    >
                      <Radio.Button
                        style={{ color: !isRanked ? 'black' : 'white' }}
                        value="classic"
                      >
                        Classique
                      </Radio.Button>
                      <Radio.Button
                        value="ranked"
                        style={{ color: isRanked ? 'black' : 'white' }}
                      >
                        Ordonnée
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </ConfigProvider>
                <label>Tags</label>{' '}
                <EditListTags tags={tags} setTags={setTags} />
                <button
                  onClick={handleSaveList}
                  style={{
                    color: colors.backgroundDerivation,
                    fontWeight: 700,
                  }}
                  className=" text-white p-2 mx-2 border-none hover:cursor-pointer bg-[#FDC500] hover:bg-[#FFD12E] btn-save-list"
                >
                  SAVE LIST{' '}
                </button>{' '}
                <div className="flex flex-row w-full ">
                  <PopUpDeleteList listId={listId} navigate={navigate} />
                  <Link
                    to={`/list/${listId}`}
                    style={{
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                    className=" text-white p-2 mx-2 border-none hover:cursor-pointer flex-1 btn-view-list"
                  >
                    VIEW LIST{' '}
                  </Link>{' '}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <DragAndDropGames
                list={list}
                setList={setList}
                setProgress={setProgress}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Aucune liste trouvée.</div>
      )}
    </PageWrapper>
  )
}
