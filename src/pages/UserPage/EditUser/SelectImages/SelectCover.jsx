import { useTranslation } from 'react-i18next'
import { Modal, Input } from 'antd'
import axios from 'axios'
import CoverPics from '../../../../utils/data/CoverPics'
import '../EditUser.scss'
import colors from '../../../../utils/style/colors'
import styled from 'styled-components'
import PreviousIcon from '../../../../assets/icons/previous.png'
import { useEffect, useState } from 'react'

const { Search } = Input

const ImageCover = styled.img`
  transition-duration: 0.2s;

  border: ${(props) => (props.active ? `4px solid ${colors.primary}` : 'none')};

  &:hover {
    transform: translateX(5px);
    cursor: pointer;
  }
`
const GameCover = styled.img`
  transition-duration: 0.2s;
  z-index: 1;

  width: 24%;
  @media (max-width: 500px) {
    width: 32%;
  }
  &:hover {
    z-index: 0;
    transform: scale(0.95);
    cursor: pointer;
    box-shadow: 5px 5px 10px black;
  }
`

export default function SelectCover({
  isOpenCoverModal,
  setIsOpenCoverModal,
  coverPic,
  setCoverPic,
}) {
  const { t } = useTranslation()
  const [selectedCover, setSelectedCover] = useState(coverPic)
  const [selectedGame, setSelectedGame] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showArtworks, setShowArtworks] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)

  const searchGames = () => {
    setIsLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_IP_ADRESS}/api/games/artworks?q=${searchQuery}`
      )
      .then((res) => {
        if (res.data !== 'Pas de resultat.') {
          setGames(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }
  const handleOk = () => {
    selectedCover !== '' &&
      setCoverPic(
        `https://images.igdb.com/igdb/image/upload/t_1080p/${selectedCover}.jpg`
      )
    setIsOpenCoverModal(false)
  }
  const handleCancel = () => {
    setIsOpenCoverModal(false)
  }

  useEffect(() => {
    if (isOpenCoverModal) searchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCoverModal])

  const onSearch = () => {
    console.log(searchQuery)
    searchGames()
  }
  return (
    <Modal
      title={showArtworks ? t('select_a_picture') : `${t('from_which_game')} ?`}
      open={isOpenCoverModal}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ minWidth: '300px', top: 10, left: 5 }}
      className="editUserStyle"
      footer={[
        showArtworks && (
          <button
            className=" absolute left-5 flex flex-row  gap-2 items-center justify-center p-2 mx-2 rounded-xl bg-transparent text-white border-none cursor-pointer"
            onClick={() => setShowArtworks(false)}
          >
            <img src={PreviousIcon} className=" w-5 h-5" alt="previous" />
            {t('return')}
          </button>
        ),
        <button
          className="btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer"
          key="back"
          onClick={handleCancel}
        >
          {t('cancel')}
        </button>,
        <button
          className=" p-2 mx-2 rounded-xl text-black border-none cursor-pointer"
          style={{ backgroundColor: colors.primary }}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          {t('apply')}
        </button>,
      ]}
    >
      {!showArtworks && (
        <div className="w-full mb-2 flex items-center justify-center">
          <Search
            placeholder={t('search_a_game')}
            onSearch={onSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
            }}
          />{' '}
        </div>
      )}

      <div className="relative">
        {!showArtworks && (
          <div className="flex w-full flex-row flex-wrap gap-1 max-h-96  overflow-auto  scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]">
            {games &&
              !isLoading &&
              games.map((game, index) => {
                return (
                  <GameCover
                    //   active={game.cover.image_id === selectedCover}
                    onClick={(e) => {
                      setSelectedGame(game)
                      setShowArtworks(true)
                    }}
                    className="  object-cover rounded-xl cursor-pointer"
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                    alt="cover"
                    key={`cover picture ${index}`}
                  />
                )
              })}
            {isLoading && (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    style={{ width: '24%' }}
                    className=" loading  h-44 "
                    key={`placeholder ${index}`}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {selectedGame && showArtworks && (
          <div className="flex flex-col gap-2 w-full h-96 px-4  overflow-auto  scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]">
            {selectedGame.artworks &&
              selectedGame.artworks.map((artwork) => {
                return (
                  <ImageCover
                    active={artwork.image_id === selectedCover}
                    onClick={(e) => setSelectedCover(artwork.image_id)}
                    className="  object-cover rounded-xl cursor-pointer w-full h-44  loading"
                    src={`https://images.igdb.com/igdb/image/upload/t_1080p/${artwork.image_id}.jpg`}
                    alt="cover"
                    key={` ${artwork.image_id}`}
                  />
                )
              })}
          </div>
        )}
      </div>
    </Modal>
  )
}
