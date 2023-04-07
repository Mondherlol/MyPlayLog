import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import wishlistIcon from '../../../assets/icons/interactions/wishlist.png'
import playedIcon from '../../../assets/icons/interactions/played.png'
import saveIcon from '../../../assets/icons/interactions/save.png'
import './GameInteraction.css'
import AddingGameModal from '../../ListComponents/AddingGameModal/AddingGameModal'

const InteractionContainer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5%;
  text-align: left;
  align-items: center;
  justify-content: center;
`

const SaveImage = styled.img`
  width: 27px;
  margin-left: 6px;
`

const WishListImage = styled.img`
  width: 27px;
`

function GameInteraction({ gameId }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const { t } = useTranslation()
  return (
    <>
      <AddingGameModal
        gameId={gameId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <InteractionContainer>
        <div className="interaction-container">
          <button className="interaction-btn" onClick={() => showModal()}>
            <span>{t('save')}</span>{' '}
            <SaveImage className="icon" src={saveIcon} alt="save-icon" />{' '}
          </button>
          <span style={{ marginLeft: 5 }}>{t('to_list')}</span>
        </div>
        <div className="interaction-container">
          <button className="interaction-btn">
            <WishListImage
              className="icon"
              src={wishlistIcon}
              alt="wishlist-icon"
            />
          </button>
          <span style={{ marginLeft: 2 }}>{t('wishlist')}</span>
        </div>
        <div className="interaction-container">
          <button className="interaction-btn">
            <WishListImage
              className="icon"
              src={playedIcon}
              alt="wishlist-icon"
            />
          </button>
          <span style={{ marginLeft: 2 }}>{t('played')}</span>
        </div>
      </InteractionContainer>
    </>
  )
}

export default GameInteraction
