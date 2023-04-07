import { Popconfirm } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import colors from '../../utils/style/colors'
import LoadingBar from 'react-top-loading-bar'

const Delete = styled.button`
  border: none;
  position: absolute;
  bottom: 50px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${colors.danger};
  font-size: 2.2vh;
  background-color: rgb(255, 255, 255);

  padding: 5px 10px 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.danger};
    color: white;
  }
`

const PopRemoveGame = ({ gameId, setList, list, setProgress }) => {
  const confirm = () => {
    setProgress(20)
    axios
      .delete(
        `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/${list._id}/${gameId}`
      )
      .then((res) => {
        setProgress(100)
        // obtenir l'index du jeu à supprimer
        const gameIndex = list.games.findIndex((game) => game.id === gameId)

        // créer un nouveau tableau de jeux sans le jeu à supprimer
        const updatedGames = [
          ...list.games.slice(0, gameIndex),
          ...list.games.slice(gameIndex + 1),
        ]

        // mettre à jour l'état avec le nouveau tableau de jeux
        setList((prevState) => ({
          ...prevState,
          games: updatedGames,
        }))
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Popconfirm
        placement="bottom"
        title={`Remove this game ?`}
        onConfirm={confirm}
        okText="Yes"
        okButtonProps={{
          style: {
            backgroundColor: colors.danger,
          },
        }}
        cancelText="No"
      >
        <Delete>
          <h5>DELETE</h5>
        </Delete>
      </Popconfirm>
    </>
  )
}
export default PopRemoveGame
