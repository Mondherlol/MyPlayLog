import { Modal } from 'antd'
import { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import colors from '../../../utils/style/colors'
import LoadingBar from 'react-top-loading-bar'

import axios from 'axios'
import CreateListModal from '../CreateListModal/CreateListModal'
import './AddingGame.css'

import AddingGameFilter from './AddingGameFilter'
import PopUpConfirm from './PopUpConfirm'

export default function AddingGameModal({
  isModalOpen,
  setIsModalOpen,
  gameId,
}) {
  const [lists, setLists] = useState([])
  const [filteredLists, setFilteredLists] = useState([])
  const [listsIds, setListsIds] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isConfirmCloseModalOpen, setIsConfirmCloseModalOpen] = useState(false)

  const [progress, setProgress] = useState(0)
  const [idListForRemoveGame, setIdListForRemoveGame] = useState([])
  const [listCreated, setListCreated] = useState(null)

  useEffect(() => {
    if (isModalOpen) {
      setProgress(5)
      getLists()
      setListsIds([])
      setIdListForRemoveGame([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const getLists = () => {
    setProgress(10)
    axios
      .get(`${process.env.REACT_APP_IP_ADRESS}/api/lists/withGame/${gameId}`)
      .then((res) => {
        setLists(res.data.lists)
        setFilteredLists(res.data.lists)
        res.data.lists.forEach((list) => {
          list.games.length !== 0 &&
            setListsIds((prevIds) => [...prevIds, list._id])
        })
      })
      .catch((err) => console.log(err))
      .finally(() => setProgress(100))
  }

  const handleCheckboxChange = (event, listId) => {
    if (event.target.checked) {
      //If CHecked add game to listId
      setListsIds((prevIds) => [...prevIds, listId])
      setIdListForRemoveGame((prevIds) => prevIds.filter((id) => id !== listId))
    } else {
      //Else remove
      setListsIds((prevIds) => prevIds.filter((id) => id !== listId))
      setIdListForRemoveGame((prevIds) => [...prevIds, listId])
    }
  }

  const addToLists = () => {
    setProgress(20)
    const data = { id_IGDB: gameId.toString() }
    const ids = listsIds.join(',')
    if (ids !== undefined) {
      const config = {
        method: 'post',
        url: `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/game?ids=${ids}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { ...data },
      }
      axios(config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setProgress(100))
    }
  }
  const removeFromLists = () => {
    setProgress(80)

    const idsToRemove = idListForRemoveGame
      .filter((id) =>
        lists.some((listItem) => {
          return listItem._id === id && listItem.games.length !== 0
        })
      )
      .join(',')

    if (
      idsToRemove !== undefined &&
      idsToRemove !== '' &&
      idsToRemove !== ','
    ) {
      const config = {
        method: 'delete',
        url: `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/remove/${gameId}?listIds=${idsToRemove}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      axios(config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setProgress(100))
    }
  }

  const handleOk = () => {
    setProgress(5)
    addToLists()
    removeFromLists()
    setIsModalOpen(false)
  }

  //If nothing changed close otherwise close
  const handleCancel = () => {
    //Compare added Games
    const idsToCompare = Object.values(lists)
      // eslint-disable-next-line array-callback-return
      .map((list) => {
        if (list.games.length !== 0) return list._id
      })
      .filter((id) => id !== undefined)
    const GamedAdded =
      listsIds.length === idsToCompare.length &&
      listsIds.every((id) => idsToCompare.includes(id))

    const GameRemoved = idListForRemoveGame.filter((id) =>
      lists.some((listItem) => {
        return listItem._id === id && listItem.games.length !== 0
      })
    )
    console.log(GameRemoved)

    if (!GamedAdded || GameRemoved.length !== 0)
      setIsConfirmCloseModalOpen(true)
    else setIsModalOpen(false)
  }

  // Si l'utilisateur crée une liste on l'ajoute à ses listes
  useEffect(() => {
    console.log('List Created')
    console.log(listCreated)
    if (listCreated !== null && !lists.includes(listCreated)) {
      setLists((prevLists) => [listCreated, ...prevLists])
      setFilteredLists((prevLists) => [listCreated, ...prevLists])
      //Et on la coche
      setListsIds((prevIds) => [...prevIds, listCreated._id])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCreated])

  return (
    <Modal
      title="Add game to lists"
      open={isModalOpen}
      className="addingGameStyle"
      onCancel={handleCancel}
      footer={[
        <button
          className="btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer"
          key="back"
          onClick={handleCancel}
        >
          CANCEL
        </button>,
        <button
          className="btn-save-list p-2 mx-2 rounded-xl text-black border-none cursor-pointer"
          style={{ backgroundColor: colors.primary }}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          ENREGISTRER
        </button>,
      ]}
    >
      <LoadingBar
        color={colors.primary}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <CreateListModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        setListCreated={setListCreated}
      />
      <PopUpConfirm
        isConfirmCloseModalOpen={isConfirmCloseModalOpen}
        setIsConfirmCloseModalOpen={setIsConfirmCloseModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="flex flex-col gap-2">
        <AddingGameFilter
          setLists={setLists}
          lists={lists}
          setFilteredLists={setFilteredLists}
        />
        <div className="flex flex-col  gap-2 h-96 overflow-y-scroll pr-5 scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]  w-full ">
          {filteredLists.length === 0 && (
            <>
              <h4>No list with that name...</h4>
              <button
                onClick={() => {
                  setIsCreateModalOpen(true)
                }}
                style={{
                  color: colors.backgroundDerivation,
                  backgroundColor: colors.primary,
                  fontWeight: 'extra-bold',
                }}
                className=" text-white p-3 btn-save-list border-none hover:cursor-pointer "
              >
                CREATE IT{' '}
              </button>
            </>
          )}
          {filteredLists.map((list) => {
            return (
              <div
                className={` w-full   ${
                  listsIds.includes(list._id)
                    ? 'style-checked-list'
                    : 'selectList'
                }`}
                key={list._id}
              >
                <Checkbox
                  style={{
                    padding: '8px',

                    borderRadius: '4px',
                    width: '100%',
                    '--background-color': colors.primary,
                    '--border-color': colors.primary,
                    color: 'white',
                    backgroundColor: 'rgb(8, 7, 27,0.5)',
                    // backgroundColor: '#131226',
                  }}
                  onChange={(event) => handleCheckboxChange(event, list._id)}
                  checked={listsIds.includes(list._id)}
                >
                  <h2 className=" text-base ">
                    {list.name}
                    <span className="text-xs  font-normal">
                      {' '}
                      {/* {list.public ? 'Private' : 'Public'}{' '} */}•{' '}
                      {list.ranked ? ' Top' : 'Liste'}
                    </span>
                  </h2>
                </Checkbox>
              </div>
            )
          })}
          {filteredLists.length !== 0 && (
            <button
              onClick={() => {
                setIsCreateModalOpen(true)
              }}
              style={{
                color: colors.backgroundDerivation,
                backgroundColor: colors.primary,
                fontWeight: 'extra-bold',
              }}
              className=" text-white p-3 btn-save-list border-none hover:cursor-pointer "
            >
              CREATE LIST{' '}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
